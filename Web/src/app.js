import { myHTTP } from './http.js';
import { ui } from './ui.js';

// Get quotes from a database when DOM loads
document.addEventListener('DOMContentLoaded', getQuotes);

// Listen for post quote
ui.postIt.addEventListener('click', postQuote);

// Listen for delete quote
document.querySelector('#quotes').addEventListener('click', deleteQuote);

// Listen for edit quote
document.querySelector('#quotes').addEventListener('click', editQuote);

// Listen for cancel edit
ui.card.addEventListener('click', cancelEdit);


// Get Quotes
function getQuotes() {
    myHTTP()
        .get('quotes')
        .then(data => ui.displayQuotes(data))
        .catch(err => console.log(err));
}

// Post Quote
function postQuote() {
  const title = ui.titleField.value;
  const content = ui.contentField.value;
  const id = ui.hiddenInputField.value;

  // prepare object literal to send as payload
  const body = {
    title,
    content
  }

// Validate user input
  if(title === '' || content === '') {
    ui.showAlert('All fields need to be filled in', 'alert alert-danger');
  } else {
        if(id === '') {
        // Post quote
            myHTTP()
                .post("quotes", body)
                .then(data => {
                    ui.showAlert('Quote added', 'alert alert-success' )
                    ui.clearFields()
                    getQuotes();
                    })
                    .catch(err => console.log(err));
        } else {
        // Update quote
            myHTTP()
            .put(`quotes/${id}`, body)
            .then(data => {
                ui.showAlert('Quote updated', 'alert alert-success' )
                ui.changeFormMode('post it')
                getQuotes();
                })
                .catch(err => console.log(err));
        }
  }
}

// Delete Quote
function deleteQuote(e) {
  if(e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.id;
    myHTTP()
        .delete(`quotes/${id}`)
        .then(data => {
            ui.removeFromGUI(e.target);
            ui.showAlert('Quote deleted', 'alert alert-success');
            getQuotes()
            })
            .catch(err => console.log(err));
  }
  e.preventDefault();
}

function editQuote(e) {
    if(e.target.parentElement.classList.contains('edit')) {
        const content = e.target.parentElement.previousElementSibling.textContent;
        const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        const id = e.target.parentElement.id;
        const quote = {
                  id,
                  content,
                  title
                }
        // Fill in card fields with current quote
        ui.fillForm(quote);
      }
      e.preventDefault();
}

// Cancel edit mode
function cancelEdit(e) {
  if(e.target.classList.contains('cancel-btn')) {
    ui.changeFormMode('add');
  }
  e.preventDefault();
}