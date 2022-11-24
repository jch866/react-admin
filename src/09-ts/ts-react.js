mytext = useRef<HTMLInputElement>(null)
setList([...list,(mytext.current as HTMLInputElement).value])

//类组件和函数式组件 ts写法对比
interface IProps {
    name:string;
    cb?:()=>void
}
//方法一；
const  App1:React.FC<IProps> = (props)=>{
    return (<div>{props.name}</div>)
}
//方法二
function App2(props:IProps){
    return (<div>{props.name}</div>)
}

//类组件 ts写法
interface Iprops {
    size: string
}
interface IState {
    n: number
}
class Button extends React.Component<Iprops, IState>{
    constructor(props: Iprops) {
        super(props)
        this.state = {
            n: 1
        }
    }
    render() {
        return (
            <div className="button">
                {this.state.n}
                {this.props.children}
            </div>
        )
    }
}
// 一个类可以实现多个接口
class TestData implements Test, Test1 {}
// type类型别名 命名唯一，不可重复
// interface接口 可以重复定义
// type可以使用in 关键字生成映射类型 interface不行
type Keys = "firstname" | "surname"

type DudeType = {
  [key in Keys]: string
}

const test: DudeType = {
  firstname: "Pawel",
  surname: "Grzybek"
}

//先定义变量，再定义类型
let p1 = {
    name: "树哥",
    age: 18,
    gender: "male",
  };
  type People = typeof p1;
  function getName(p: People): string {
    return p.name;
  }
  getName(p1);





  

