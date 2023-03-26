import { getPhotos } from './setup.js';
import { createTemplateList } from './thumbnail.js';
//import './modal.js';

createTemplateList(getPhotos());
