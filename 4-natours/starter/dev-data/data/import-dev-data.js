const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successfull!');
  })
  .catch((err) => {
    console.log(err);
  });
const Tour = require('../../models/tourModel');

fs.readFile(`${__dirname}/tours-simple.json`, 'utf-8', async (err, tours) => {
  if (err) {
    console.log(err);
    return;
  }

  const tourData = JSON.parse(tours).map((tour) => {
    const { id, ...tourProperties } = tour;
    return tourProperties;
  });
  if (process.argv[2] === '--delete') {
    await deleteData();
  }

  if (process.argv[2] === '--import') {
    await importData(tourData);
  }
});

const importData = async (tours) => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany({});
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
