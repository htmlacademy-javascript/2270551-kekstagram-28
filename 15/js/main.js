import {setOnFormSubmit, setOnUploadFormChange, closeModal} from './user-form.js';
import {createGallery} from './gallery.js';
import {getData, sendData} from './server-link.js';
import {showAlert} from './utils.js';
import {showSuccessMessage, showErrorMessage} from './message.js';

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
  createGallery(data);
} catch (err) {
  showAlert(err.message);
}


