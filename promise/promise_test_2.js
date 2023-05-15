let isProcess = false;
elResult = document.querySelector('#result');

document.querySelector('#run').onclick = () => {
    if (isProcess) {
        elResult.textContent = 'Please wait! The task is still being executed!';
        return;
    }
    isProcess = true;
    elResult.textContent = 'Task in progress...';
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const mark = Math.floor(Math.random() * 4) + 2;
            mark > 3 ? resolve(mark) : reject(mark);
        }, 5000);
    });
    promise
        .then(value => {
            elResult.textContent = `Congratulations! You passed the exam with a score of ${value}! 
            Your dad gave you $100, as promised.`;
        })
        .catch(value => {
            elResult.textContent = `Unfortunately, you received a score of ${value}. Your dad did not give you $100.`;
        })
        .finally(() => {
            isProcess = false;
        });
}