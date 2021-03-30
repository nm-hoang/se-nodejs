/** @format */

const cloudinary = require('cloudinary').v2
const path = '/api/storage/images/'

async function uploadImage(
  data = {
    imageName: '',
  },
  options = {
    crop: 'limit',
    tags: 'default',
    width: 3000,
    height: 2000,
  }
) {
  const result = await cloudinary.uploader.upload(
    path + data.imageName,
    {
      crop: options.crop,
      tags: options.tags,
      width: options.width,
      height: options.height,
    },
    function (error, result) {
      try {
        console.log(result)
        if (error) {
          throw new Error(error.message)
        }
        return result
      } catch (error) {
        throw new Error(error.message)
      }
    }
  )

  // cloudinary.image('sample', {
  //   crop: 'fill',
  //   gravity: 'faces',
  //   width: 300,
  //   height: 200,
  //   format: 'jpg',
  // })
  return result
}

module.exports = uploadImage
