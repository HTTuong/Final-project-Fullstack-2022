import { Link } from 'react-router-dom';

function Button({title, type, to, onClick, icon, ...params }) {
    let Component = 'button';
    let props = {
        onClick,
        ...params
    }
    if (type === 'link') {
        Component = Link;
        delete props.onClick;
        props.to = to;
    }
    return <Component {...props}>
        {icon ? icon : title}
    </Component>;
}

export default Button;
