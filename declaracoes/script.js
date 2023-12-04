document.getElementById('addTagButton').addEventListener('click', function() {
    let tagName = document.getElementById('tagName').value;
    let textEditor = document.getElementById('textEditor');
    let cursorPos = textEditor.selectionStart;
    let textBefore = textEditor.value.substring(0, cursorPos);
    let textAfter = textEditor.value.substring(cursorPos);
    textEditor.value = textBefore + `{${tagName}}` + textAfter;
});

document.getElementById('createFieldsButton').addEventListener('click', function() {
    let peopleCount = document.getElementById('peopleCount').value;
    let fieldsContainer = document.getElementById('fieldsContainer');
    fieldsContainer.innerHTML = ''; // Clear existing fields

    for (let i = 0; i < peopleCount; i++) {
        let personFields = document.createElement('div');
        personFields.innerHTML = `<h3>Person ${i + 1}</h3>`;
        let tagNames = document.getElementById('textEditor').value.match(/\{([^}]+)\}/g);

        if (tagNames) {
            tagNames.forEach(tagName => {
                let fieldName = tagName.replace(/[{}]/g, '') + `_${i}`;
                personFields.innerHTML += `<label>${fieldName}: </label><input type='text' name='${fieldName}'><br>`;
            });
        }

        fieldsContainer.appendChild(personFields);
    }
});

document.getElementById('generateFinalTextButton').addEventListener('click', function() {
    let finalText = document.getElementById('textEditor').value;
    let fields = document.querySelectorAll('#fieldsContainer input');
    
    fields.forEach(field => {
        let regex = new RegExp(`\\{${field.name.split('_')[0]}\\}`, 'g');
        finalText = finalText.replace(regex, field.value);
    });

    document.getElementById('finalTextOutput').innerText = finalText;
});
