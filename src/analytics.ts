import * as $ from 'jquery';

function createAnalytics(): object{
    let count = 0;
    let isDestroy: boolean = true;
    const listener = (): number => count++;
    $(document).on('click', listener);

    return{
        destroy(): void{
            $(document).off('click', listener);
            isDestroy = true;
        },
        getAllClick(){
            if (!isDestroy) return 'Analytics is destroyed. ' + `Total counts ${count}`;
            return count;
        }
    }
}
// @ts-ignore
 window['analytics'] = createAnalytics();
