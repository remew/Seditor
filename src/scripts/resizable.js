
export default class ResizablePanel {

    constructor(container) {
        const start = container.getElementsByClassName('panel-start')[0];
        const splitter = container.getElementsByClassName('panel-splitter')[0];
        const end = container.getElementsByClassName('panel-end')[0];
        this._moving = false;
        splitter.addEventListener('mousedown', () => {
            this._moving = true;
        });
        window.addEventListener('mouseup', () => {
            this._moving = false;
        });
        container.addEventListener('mousemove', e => {
            if (this._moving) {
                if (container.classList.contains('col')) {
                    start.style.flexGrow = e.y / container.clientHeight * 2;
                    end.style.flexGrow = (1 - e.y / container.clientHeight) * 2;
                } else {
                    start.style.flexGrow = e.x / container.clientWidth * 2;
                    end.style.flexGrow = (1 - e.x / container.clientWidth) * 2;
                }
            }
        });
    }
}

