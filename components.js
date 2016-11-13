class ClockApp extends React.Component {

    ones=['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
    tens=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];

    constructor() {
        super();

        const d = new Date();
        const hour = d.getHours() % 12;
        const minute = d.getMinutes();
        const second = d.getSeconds(); 
        this.state = {
            hour,
            minute,
            second,
            hourString: this._getNumber(hour),
            minuteString: this._getNumber(minute),
            secondString: this._getNumber(second),
            hourDeg: 360 / 12 * hour -90,
            minuteDeg: 360 / 60 * minute -90,
            secondDeg: 360 / 60 * second -90
        };

        setInterval(this._tick.bind(this), 1000);
    }

    _getNumber(number) {
        if(number === 0) {
            return 'zero';
        }else if(number <20) {
            return " "+this.ones[number];
        }else if(number % 10 === 0) {
            return " "+this.tens[Math.floor(number / 10)];
        }else{
            return " "+this.tens[Math.floor(number / 10)]+"-"+this.ones[number % 10];
        }
    }

    _tick(sheet) {
        const d = new Date(); 
        const hour = d.getHours() % 12;
        const minute = d.getMinutes();
        const second = d.getSeconds(); 

        // Do this way to ensure smooth transition animation from 11 to 0 and 59 to zero
        const hourDeg   = hour      === this.state.hour    ? this.state.hourDeg   : this.state.hourDeg + 30;
        const minuteDeg = minute    === this.state.minute  ? this.state.minuteDeg : this.state.minuteDeg + 6;
        const secondDeg = second    === this.state.second  ? this.state.secondDeg : this.state.secondDeg + 6;

        this.setState({
            hour,
            minute,
            second,
            hourString: this._getNumber(hour),
            minuteString: this._getNumber(minute),
            secondString: this._getNumber(second),
            hourDeg,
            minuteDeg,
            secondDeg
        });         
    }
    render() {
        return( 
            <div className='clock'>
                <h1 style={{ transform: 'rotate('+this.state.hourDeg+'deg)' }} >{this.state.hourString}</h1>
                <h2 style={{ transform: 'rotate('+this.state.minuteDeg+'deg)' }} >{this.state.minuteString}</h2>
                <h3 style={{ transform: 'rotate('+this.state.secondDeg+'deg)' }} >{this.state.secondString}</h3>
                
            </div>
        );
    }
}

                /*

                <Hand type='hour'   value={this.state.hourString}      deg={this.state.hourDeg} />
                <Hand type='minute' value={this.state.minuteString}    deg={this.state.minuteDeg} />
                <Hand type='second'  value={this.state.secondString}    deg={this.state.secondDeg} />

                */

class Hand extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.deg === nextProps.deg) {
            return false;
        }
        return true;
    }
    render() {
        console.log(this.props.type);
        
        switch(this.props.type) {
            case 'hour':
                return( <h1 style={{ transform: 'rotate('+this.props.deg+'deg)' }} >{this.props.value}</h1> );
            case 'minute':
                return( <h2 style={{ transform: 'rotate('+this.props.deg+'deg)' }} >{this.props.value}</h2> );
            case 'second':
                return( <h3 style={{ transform: 'rotate('+this.props.deg+'deg)' }} >{this.props.value}</h3> );
        }
        
    }
}


ReactDOM.render(
    <ClockApp />, document.getElementById('Clock-app')
);