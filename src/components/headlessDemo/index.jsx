import React, { useState } from 'react'

const flip = () => ({ flipResults: Math.random() });

const CoinFlip = (props) => {
    const [randomFlip, setFlip] = useState(flip())
    const handleClick = () => {
        console.log(flip());
        const randomNum = flip()
        setFlip(randomNum)
    };
    return props.children({
        rerun: handleClick,
        isHeads: randomFlip.flipResults < 0.5,
    });

}
export default () => (
    <>
        <CoinFlip>
            {({ rerun, isHeads }) => {
                return <>
                    <button onClick={rerun}>Reflip</button>
                    {isHeads ? (
                        <div>
                            <img src="/heads.svg" alt="Heads" />
                        </div>
                    ) : (
                        <div>
                            <img src="/tails.svg" alt="Tails" />
                        </div>
                    )}
                </>
            }}
        </CoinFlip>
        <CoinFlip>
            {({ isHeads }) => (
                <>
                    {isHeads ? (
                        <div>
                            {/* <img src="/heads.svg" alt="Heads" /> */}
                            <span>Heads</span>
                        </div>
                    ) : (
                        <div>
                            {/* <img src="/tails.svg" alt="Tails" /> */}
                            <span>Tails</span>
                        </div>
                    )}
                </>
            )}
        </CoinFlip>
    </>
)

//  export default class CoinFlip extends React.Component {
//     state = flip();

//     handleClick = () => {
//       this.setState(flip);
//     };

//     render() {
//       console.log('7878',this.props);
//       return this.props.children({
//         rerun: this.handleClick,
//         isHeads: this.state.flipResults < 0.5,
//       });
//     }
//   }


    //   <CoinFlip>
    //   {({ rerun, isHeads }) => (
    //     <>
    //       <button onClick={rerun}>Reflip</button>
    //       {isHeads ? (
    //         <div>
    //           <img src="/heads.svg" alt="Heads" />
    //         </div>
    //       ) : (
    //         <div>
    //           <img src="/tails.svg" alt="Tails" />
    //         </div>
    //       )}
    //     </>
    //   )}
    // </CoinFlip>

// export default 