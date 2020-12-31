import React, { Component } from 'react' //rec
import './SortingVisualizer.css';

class SortingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            bubbleRunning: false,
            selectionRunning: false,
            insertionRunning: false,
            speed: 0
        };
    }
    
    // creates bar graph when page is intitally opened
    componentDidMount() {
        const arr = [];
        for (let i = 0; i < 80; i++) {
            arr.push(Math.floor(Math.random() * 600) + 5);
        }
        this.setState({arr});
    }

    // randomizes a new bar graph
    async resetSet(length) {
        // stops sorting if resetSet is clicked
        document.getElementById("newSet").style.color = `${'#F45B69'}`;
        if(this.bubbleRunning || this.selectionRunning || this.insertionRunning)
        {
            this.bubbleRunning = false;
            this.selectionRunning = false;
            this.insertionRunning = false;
        }

        const arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(Math.floor(Math.random() * 600) + 5);
        }
        await this.sleep(200);
        document.getElementById("newSet").style.color = `${'white'}`;
        this.setState({arr});
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    async bubbleSort(arr, speed) {
        document.getElementById("bubble").disabled = true;
        document.getElementById("selection").disabled = true;
        document.getElementById("insertion").disabled = true;
        document.getElementById("speed").disabled = true;
        document.getElementById("blockNum").disabled = true;
        document.getElementById("bubble").style.color = `${'#F45B69'}`;
        this.bubbleRunning = true;
        
        for(let j = 0; j < arr.length-1; j++) {
            for(let i = 0; i < arr.length-j-1; i++) {
                if(!this.bubbleRunning)
                    break;
                document.getElementById(i).style.backgroundColor = '#F45B69';
                document.getElementById(i+1).style.backgroundColor = '#F45B69';
                await this.sleep(speed);
                if(arr[i] > arr[i+1])
                {
                    let tempp = arr[i];
                    arr[i] = arr[i+1];
                    arr[i+1] = tempp;

                    document.getElementById(i).style.height = `${arr[i]}px`;
                    document.getElementById(i + 1).style.height = `${arr[i+1]}px`;
                }               
                document.getElementById(i).style.backgroundColor = '#028090';
                document.getElementById(i+1).style.backgroundColor = '#028090';        
            } 
        }
        
        document.getElementById("bubble").style.color = `${'white'}`;
        document.getElementById("bubble").disabled = false;
        document.getElementById("selection").disabled = false;
        document.getElementById("insertion").disabled = false;
        document.getElementById("speed").disabled = false;
        document.getElementById("blockNum").disabled = false;
        this.bubbleRunning = false;
        return arr; 
    }

    async selectionSort(arr, speed) {
        document.getElementById("bubble").disabled = true;
        document.getElementById("selection").disabled = true;
        document.getElementById("insertion").disabled = true;
        document.getElementById("speed").disabled = true;
        document.getElementById("blockNum").disabled = true;
        document.getElementById("selection").style.color = `${'#F45B69'}`;
        this.selectionRunning = true;

        for(let i = 0; i < arr.length-1; i++) {
            let smallestIndex = i;
            for(let j = i+1; j < arr.length; j++) {
                if(!this.selectionRunning)
                    break;
                document.getElementById(i).style.backgroundColor = '#F45B69';
                document.getElementById(j).style.backgroundColor = '#F45B69';
                await this.sleep(speed);
                document.getElementById(i).style.backgroundColor = '#028090';
                document.getElementById(j).style.backgroundColor = '#028090';

                if(arr[j] < arr[smallestIndex]) {
                    smallestIndex = j;
                }
            }
            
            let temp = arr[i]
            arr[i] = arr[smallestIndex];
            arr[smallestIndex] = temp;

            document.getElementById(i).style.height = `${arr[i]}px`;
            document.getElementById(smallestIndex).style.height = `${arr[smallestIndex]}px`;
        }

        document.getElementById("selection").style.color = `${'white'}`;
        document.getElementById("bubble").disabled = false;
        document.getElementById("selection").disabled = false;
        document.getElementById("insertion").disabled = false;
        document.getElementById("speed").disabled = false;
        document.getElementById("blockNum").disabled = false;
        this.selectionRunning = false;
        return arr;
    }

    async insertionSort(arr, speed) {
        document.getElementById("bubble").disabled = true;
        document.getElementById("selection").disabled = true;
        document.getElementById("insertion").disabled = true;
        document.getElementById("speed").disabled = true;
        document.getElementById("blockNum").disabled = true;
        document.getElementById("insertion").style.color = `${'#F45B69'}`;
        this.insertionRunning = true;

        // take element at i
        // comapre to i-1
        // once correct index found, put i into index
        // move all the others up one

        // for loop thro all i
        // while loop thro j to find correct element
        for(let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            document.getElementById(i).style.backgroundColor = '#F45B69';
            while(j >= 0 && arr[j] > key) {
                if(!this.insertionRunning)
                    break;

                //document.getElementById(j).style.backgroundColor = '#F45B69';
                let temp = document.getElementById(i).style.height;
                for(let k = i; k > j+1; k--) { //check
                    document.getElementById(k).style.height = `${arr[k-1]}px`;
                }
                document.getElementById(j).style.height = temp;
                await this.sleep(speed);
                //document.getElementById(j).style.backgroundColor = '#028090';

                //arr[j + 1] = arr[j];
                // document.getElementById(j + 1).style.height = `${arr[j + 1]}px`; //slbjdh
                j = j - 1;
                // document.getElementById(j + 1).style.height = `${arr[j + 1]}px`; //lawiefb
            }
            document.getElementById(i).style.backgroundColor = '#028090';
            arr[j + 1] = key;
            //document.getElementById(j + 1).style.height = `${arr[j + 1]}px`; //aljwhebf
        }

        document.getElementById("insertion").style.color = `${'white'}`;
        document.getElementById("bubble").disabled = false;
        document.getElementById("selection").disabled = false;
        document.getElementById("insertion").disabled = false;
        document.getElementById("speed").disabled = false;
        document.getElementById("blockNum").disabled = false;
        this.insertionRunning = false;
        return arr;
    }

    changeSpeed() {
        let speed = document.getElementById("speed").value;
        this.setState({speed});
    }

    changeBlockNum() {
        let num = document.getElementById("blockNum").value;
        const arr = [];
        for (let i = 0; i < num; i++) {
            arr.push(Math.floor(Math.random() * 600) + 5);
        }
        this.setState({arr});
    }

    render() {
        return (
        <header>
            <button className="newSet" id="newSet" onClick= {() => this.resetSet(this.state.arr.length)}> New Set </button>
            <button id="bubble" onClick= {() => this.bubbleSort(this.state.arr, this.state.speed)}> Bubble Sort </button>
            <button id="selection" onClick= {() => this.selectionSort(this.state.arr, this.state.speed)}> Selection Sort </button>
            <button id="insertion" onClick= {() => this.insertionSort(this.state.arr,  this.state.speed)}> Insertion Sort </button>
            <div className="slidecontainer">
                <p>Sorting Speed:</p>
                <input id="speed" type="range" min="0" max="700" class="speedSlider" onChange={this.changeSpeed.bind(this, 'value')}/>
            </div>
            <div className="slidecontainer">
                <p>Number of Bars:</p>
                <input id="blockNum" type="range" min="10" max="150"  class="barSlider" onChange={this.changeBlockNum.bind(this, 'value')}/>
            </div>
            
            <div className='allBlocks'> 
                {this.state.arr.map((val, idx) => (
                    <div id={idx} className='block' style={{height: `${val}px`}} key={idx}> </div>
                ))}
            </div>
        </header>
        )
    }
}

export default SortingVisualizer
