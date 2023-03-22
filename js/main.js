import {renderThumbnails} from './thumbnails.js';
import {initGallery} from './gallery.js';
import { createPhotos } from './data.js';

const photos = createPhotos();
renderThumbnails(photos);
initGallery(photos);
