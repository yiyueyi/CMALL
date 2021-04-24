import React,{Component} from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (res) => ({
    res: res
});
class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            res: props.res//测试数据
         }
    }

    render() { 
        return ( 
            <div>
                我是Home页面
            </div>
         );
    }
}
 
export default connect(mapStateToProps) (HomePage);