class userInterface {
  constructor() {
    this.quote = document.querySelector('#quotes');
    this.titleField = document.querySelector('#title');
    this.contentField = document.querySelector('#content');
    this.hiddenInputField = document.querySelector('#id');
    this.postIt = document.querySelector('button');
    this.card = document.querySelector('#inputCard');
    this.state = 'add';
  }

  // Show all quotes
  displayQuotes(quotes) {
    let output = '';

    quotes.forEach((quote) => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${quote.title}</h4>
            <p class="card-text">${quote.content}</p>
            <a href="#" class="edit card-link" id="${quote.id}">
              <i class="fa fa-pencil"></i>
            </a>
            <a href="#" class="delete card-link" id="${quote.id}">
            <i class="fa fa-remove"></i>
          </a>
          </div>
        </div>
      `;
    });
    this.quote.innerHTML = output;
  }

  // Remove quote from GUI
  removeFromGUI(element) {
    element.parentElement.parentElement.parentElement.remove();
  }

    // Display alert msg
    showAlert(message, className) {
      this.clearAlert();

      const alert = document.createElement('div');
      alert.className = className;
      alert.appendChild(document.createTextNode(message));
      this.card.insertBefore(alert, this.postIt);

      setTimeout(() => {
        this.clearAlert();
      }, 3000);
    }

    // Remove alert msg
    clearAlert() {
      const currentAlert = document.querySelector('.alert');
      if(currentAlert) {
        currentAlert.remove();
      }
    }

  // Clear input fields
  clearFields() {
    this.titleField.value = '';
    this.contentField.value = '';
  }

  // Populate fields with existing content to edit
    fillForm(quote) {
      this.titleField.value = quote.title;
      this.contentField.value = quote.content;
      this.hiddenInputField.value = quote.id;
      this.changeFormMode('edit');
    }

  // Change for mode
    changeFormMode(mode) {
      if(mode === 'edit') {
        this.postIt.textContent = 'Update Quote';

        // Add cancel btn
        const button = document.createElement('button');
        button.className = 'btn cancel-btn btn-light';
        button.style.marginBottom = "10px";
        button.textContent = 'Cancel Edit';

      // Add new btn to DOM
        this.card.insertBefore(button, this.postIt);
      } else {
          this.postIt.textContent = 'Post It';

          // Remove cancel button if present
          if(document.querySelector('.cancel-btn')) {
            document.querySelector('.cancel-btn').remove();
          }
          // Clear id
          this.deleteHiddenIdValue();
          // Clear text
          this.clearFields();
       }
    }

  // Delete hidden ID value
      deleteHiddenIdValue() {
        this.hiddenInputField.value = '';
      }
}

export const ui = new userInterface();