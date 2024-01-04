// Import the Cloudinary class
import { Cloudinary } from '@cloudinary/url-gen';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { text } from '@cloudinary/url-gen/qualifiers/source';
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle';

// Create your instance
const cloudinary = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.CLOUDINARY_NAME,
  },
  url: {
    secure: true, // force https, set to false to force http
  },
});

const getThumbnail = (title: string) => {
  const thumbnail = cloudinary
    .image('astro-course-template')
    .overlay(
      source(text(title, new TextStyle('Cabin', 64).fontWeight('bold')))
    );

  return thumbnail.toURL();
};

export { cloudinary, getThumbnail };
