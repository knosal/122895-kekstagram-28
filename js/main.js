import { getPhotos } from './setup.js';
import { createTemplateList } from './thumbnail.js';

createTemplateList(getPhotos());
