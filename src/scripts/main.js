
const store = {
    root: [{
        title: 'title1',
        main: [
            'main text'
        ]
    }, {
        title: 'title2',
        main: [
            'main text'
        ]
    }]
};

window.addEventListener('DOMContentLoaded', () => {
    const treeRoot = document.getElementById('tree');

    updateTree(treeRoot, store);

    function updateTree(tree, store) {
        const html = store.root.map(item => item.title).reduce((html, title) => {
            return html + '<li>' + title + '</li>';
        }, '');
        tree.innerHTML = '<ul>' + html + '</ul>';
    }
});

