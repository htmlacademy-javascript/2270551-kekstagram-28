import {setOnFormSubmit, setOnUploadFormChange, closeModal} from './user-form.js';
import {createGallery} from './gallery.js';
import {getData, sendData} from './server-link.js';
import {showAlert, debounce} from './utils.js';
import {showSuccessMessage, showErrorMessage} from './message.js';
import {initSort,getSortedPhotos} from './filters.js';

setOnUploadFormChange();

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debouncedCreateGallery = debounce(createGallery);
  initSort(data, debouncedCreateGallery);
  createGallery(getSortedPhotos());
} catch (err) {
  showAlert(err.message);
}

