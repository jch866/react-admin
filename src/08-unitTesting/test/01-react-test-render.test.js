import ShallowRender from 'react-test-renderer/shallow'
import ReactTestUtil from 'react-dom/test-utils'
import App from './../App'
describe('01-react-test-render',function(){
    it('app title',function(){
        const render = new ShallowRender(); 
        render.render(<App/>)
        console.log(render.getRenderOutput().props.children[0].type)
        expect(render.getRenderOutput().props.children[0].type).toBe('h3')
        expect(render.getRenderOutput().props.children[0].props.children).toBe('unit testing')
    })
    it('删除按钮',function(){
        const app = ReactTestUtil.renderIntoDocument(<App/>);               
        let items = ReactTestUtil.scryRenderedDOMComponentsWithTag(app,'li')
        let delbtn = items[0].querySelector('button');
        ReactTestUtil.Simulate.click(delbtn);

        let items_after = ReactTestUtil.scryRenderedDOMComponentsWithTag(app,'li')

        expect(items.length-1).toBe( items_after.length)
         
    })

    it('添加按钮',function(){
        const app = ReactTestUtil.renderIntoDocument(<App/>);               
        let items = ReactTestUtil.scryRenderedDOMComponentsWithTag(app,'li')
        console.log(items.length);

        let input =  ReactTestUtil.scryRenderedDOMComponentsWithTag(app,'input');
        input.value = 'libai'
        let addbtn = ReactTestUtil.findRenderedDOMComponentWithClass(app,'addbtn')
        ReactTestUtil.Simulate.click(addbtn);

        let items_after = ReactTestUtil.scryRenderedDOMComponentsWithTag(app,'li')
        expect(items_after.length).toBe(items.length+1)
         
    })
})

