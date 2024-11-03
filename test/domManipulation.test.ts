// domManipulation.test.ts
import { initializeComments } from '../src/domManipulation';

describe('initializeComments', () => {
    let showHideBtn: HTMLButtonElement;
    let commentWrapper: HTMLElement;

    beforeEach(() => {
        // Setup DOM elements for the test
        document.body.innerHTML = `
      <button class="show-hide">Show comments</button>
      <div class="comment-wrapper" style="display: none;"></div>
    `;

        showHideBtn = document.querySelector('.show-hide') as HTMLButtonElement;
        commentWrapper = document.querySelector('.comment-wrapper') as HTMLElement;

        initializeComments();
    });

    test('should hide comments by default', () => {
        expect(commentWrapper.style.display).toBe('none');
    });

    test('should show comments when button is clicked and text changes to "Hide comments"', () => {
        // Simulate button click
        showHideBtn.click();

        // Verify the results
        expect(commentWrapper.style.display).toBe('block');
        expect(showHideBtn.textContent).toBe('Hide comments');
    });

    test('should hide comments when button is clicked again and text changes to "Show comments"', () => {
        // First click to show comments
        showHideBtn.click();
        // Second click to hide comments
        showHideBtn.click();

        // Verify the results
        expect(commentWrapper.style.display).toBe('none');
        expect(showHideBtn.textContent).toBe('Show comments');
    });
});
