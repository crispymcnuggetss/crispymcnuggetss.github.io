var threads;
if (localStorage && localStorage.getItem('threads')) {
    threads = JSON.parse(localStorage.getItem('threads'));
} else {
    threads = [
        {
            id: 1,
            title: "Thread 1",
            author: "John",
            date: Date.now(),
            content: "Thread content",
            comments: [
                {
                    author: "Jack",
                    date: Date.now(),
                    content: "Hey there",
                },
                {
                    author: "Arthur",
                    date: Date.now(),
                    content: "Hey to you too",
                }
            ]
        },
        {
            id: 2,
            title: "Thread 2",
            author: "John",
            date: Date.now(),
            content: "Thread content",
            comments: [
                {
                    author: "Jack",
                    date: Date.now(),
                    content: "Hey there",
                },
                {
                    author: "Arthur",
                    date: Date.now(),
                    content: "Hey to you too",
                }
            ]
        }
    ];
    localStorage.setItem('threads', JSON.stringify(threads));
}

function addThread(thread) {
    var container = document.querySelector('ol');

    var html = `
        <li class="row">
            <a href="/thread.html?${thread.id}">
                <h4 class="title">
                    ${thread.title || 'Untitled Thread'}
                </h4>
                <div class="bottom">
                    <p class="timestamp">
                        ${new Date(thread.date).toLocaleString()}
                    </p>
                    <p class="comment-count">
                        ${thread.comments.length} comments
                    </p>
                </div>
            </a>
        </li>
    `;

    container.insertAdjacentHTML('beforeend', html);
}