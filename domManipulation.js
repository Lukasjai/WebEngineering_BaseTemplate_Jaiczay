// domManipulation.js

export const initializeComments = () => {
    const showHideBtn = document.querySelector('.show-hide');
    const commentWrapper = document.querySelector('.comment-wrapper');

    commentWrapper.style.display = 'none';

    showHideBtn.onclick = () => {
        try {
            const showHideText = showHideBtn.textContent;
            if (showHideText === 'Show comments') {
                showHideBtn.textContent = 'Hide comments';
                commentWrapper.style.display = 'block';
            } else {
                showHideBtn.textContent = 'Show comments';
                commentWrapper.style.display = 'none';
            }
        } catch (error) {
            console.error('Error showing/hiding comments:', error);
            alert('There was an error toggling the comments section. Please try again.');
        }
    };
};

export const initializeCommentForm = () => {
    const form = document.querySelector('.comment-form');
    const nameField = document.querySelector('#name');
    const commentField = document.querySelector('#comment');
    const list = document.querySelector('.comment-container');

    form.onsubmit = (e) => {
        e.preventDefault();
        try {
            const listItem = document.createElement('li');
            const namePara = document.createElement('p');
            const commentPara = document.createElement('p');
            const nameValue = nameField.value;
            const commentValue = commentField.value;

            if (!nameValue || !commentValue) {
                throw new Error('Both name and comment are required.');
            }

            namePara.textContent = nameValue;
            commentPara.textContent = commentValue;

            list.appendChild(listItem);
            listItem.appendChild(namePara);
            listItem.appendChild(commentPara);

            nameField.value = '';
            commentField.value = '';
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('Failed to add your comment. Please ensure all fields are filled and try again.');
        }
    };
};
