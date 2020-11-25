import mongoose from 'mongoose'

const runDatabase = () => {
  const db = mongoose.connection
  if (!db.readyState) {
    mongoose.connect('mongodb://localhost/news', {useNewUrlParser: true})
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log('db connected!')
    });
  }
}

export default runDatabase