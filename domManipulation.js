// domManipulation.ts

// Initialize the comments section
export const initializeComments = () => {
    const showHideBtn = document.querySelector<HTMLButtonElement>('.show-hide');
    const commentWrapper = document.querySelector<HTMLElement>('.comment-wrapper');

    if (commentWrapper) {
        commentWrapper.style.display = 'none';
    }

    if (showHideBtn) {
        showHideBtn.onclick = () => {
            try {
                const showHideText = showHideBtn.textContent;
                if (showHideText === 'Show comments') {
                    showHideBtn.textContent = 'Hide comments';
                    if (commentWrapper) {
                        commentWrapper.style.display = 'block';
                    }
                } else {
                    showHideBtn.textContent = 'Show comments';
                    if (commentWrapper) {
                        commentWrapper.style.display = 'none';
                    }
                }
            } catch (error) {
                console.error('Error showing/hiding comments:', error);
                alert('There was an error toggling the comments section. Please try again.');
            }
        };
    }
};


// Initialize the comment form
export const initializeCommentForm = () => {
    const form = document.querySelector<HTMLFormElement>('.comment-form');
    const nameField = document.querySelector<HTMLInputElement>('#name');
    const commentField = document.querySelector<HTMLTextAreaElement>('#comment');
    const list = document.querySelector<HTMLElement>('.comment-container');

    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            try {
                if (nameField && commentField && list) {
                    const listItem = document.createElement('li');
                    const namePara = document.createElement('p');
                    const commentPara = document.createElement('p');
                    const nameValue = nameField.value.trim();
                    const commentValue = commentField.value.trim();

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
                }
            } catch (error) {
                console.error('Error adding comment:', error);
                alert('Failed to add your comment. Please ensure all fields are filled and try again.');
            }
        };
    }
};
