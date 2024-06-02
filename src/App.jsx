import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import "./App.css";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import useLocalStorage from "./Hooks/useLocalStorage";

// function App() {
//____________________________________
// useState Hook Examples:
//____________________________________
//Example(1):
//_____________________________________
// const [color, setColor] = useState("Red");
// const changeColor = () => {
//   setColor("Blue");
// };
// return (
//   <>
//     <h1> My favoute color is {color}</h1>
//     <button onClick={changeColor}>Blue</button>
//   </>
// );
//____________________________________________
// Example(2):
//____________________________________________
// const [car, setCar] = useState({
//   brand: "ferrari",
//   model: "Roma",
//   year: "2023",
//   color: "red",
// });
// const changeColor = () => {
//   setCar((prevcar) => {
//     return { ...prevcar, color: "blue" };
//   });
// };
// return (
//   <>
//     <h1>My {car.brand} </h1>
//     <p>
//       It is a {car.color} {car.model} from {car.year}
//     </p>
//     <button onClick={changeColor}>Blue</button>
//   </>
// );
//______________________________________________
// Example (3):
//______________________________________________
// const [count, setCount] = useState(0);
// const increaseCount = () => {
//   setCount((prev) => {
//     return prev + 4;
//   });
// };
// return (
//   <h1>
//     <h1>Count : {count}</h1>
//     <button onClick={increaseCount}>Increase</button>
//   </>
// );
// __________________________________________________
// useEffect Hook Examples:
//___________________________________________________
//Example(1): without dependencies: useEffect(call back function,dependencies)
// const [count, setCount] = useState(0);
// useEffect(() => {
//   setTimeout(() => {
//     setCount((count) => count + 1);
//   }, 2000);
// });
// return (
//   <>
//     <h1>I have rendered {count} times!</h1>
//   </>
// );
//___________________________________________________________
// Example(2): using blank array in place of dependencies
//___________________________________________________________
// const [count, setCount] = useState(0);
// useEffect(() => {
//   setTimeout(() => {
//     setCount((count) => count + 1);
//   }, 2000);
// }, []);
// return (
//   <>
//     <h1>I have rendered {count} times!</h1>
//   </>
// );
//________________________________________________________________________
// Example(3): using dependencies in the array in place of dependencies
//________________________________________________________________________
// const [count, setCount] = useState(0);
// const [name, setName] = useState("Great Stack");
// useEffect(() => {
//   setTimeout(() => {
//     setCount((count) => count + 1);
//   }, 2000);
// }, [count, name]);
// return (
//   <>
//     <h1>I have rendered {count} times!</h1>
//   </>
// );
//_____________________________________________________________
// useRef Hook:
//_____________________________________________________________
// Example(1):
//_____________________________________________________________
// const [value, setValue] = useState(0);
// const count = useRef(0);
// useEffect(() => {
//   count.current = count.current + 1;
// });
// return (
//   <>
//     <button
//       onClick={() => {
//         setValue((prev) => prev - 1);
//       }}
//     >
//       -1
//     </button>
//     <h1>{value}</h1>
//     <button
//       onClick={() => {
//         setValue((prev) => prev + 1);
//       }}
//     >
//       +1
//     </button>
//     <h1>Render Count:{count.current}</h1>
//   </>
// );
//__________________________________________________________
// Example(2):
//__________________________________________________________
// const inputElem = useRef();
// const btnClicked = () => {
//   inputElem.current.style.background = "blue";
// };
// return (
//   <>
//     <input type="text" ref={inputElem} />
//     <button onClick={btnClicked}>Click here</button>
//   </>
// );
//_____________________________________________________________
//   useMemo Hook:
//_____________________________________________________________
// Example(1):
//_____________________________________________________________
// const [number, setNumber] = useState(0);
// const [counter, setCounter] = useState(0);
// function cubeNum(num) {
//   console.log("Calculation Done !");
//   return Math.pow(num, 3);
// }
// const result = cubeNum(number);
// return (
//   <>
//     <input
//       type="number"
//       value={number}
//       onChange={(e) => {
//         setNumber(e.target.value);
//       }}
//     />
//     <h1>Cube of the Number : {result}</h1>
//     <button
//       onClick={() => {
//         setCounter(counter + 1);
//       }}
//     >
//       Counter++
//     </button>
//     <h1>Counter: {counter}</h1>
//   </>
// );
//________________________________________________________________________________________
// The above example rerender the whole page even we perform the task like button in the last. so to avoid this problem we use useMemo hook in next example.
//________________________________________________________________________________________
// Example(2):
//________________________________________________________________________________________
// const [number, setNumber] = useState(0);
// const [counter, setCounter] = useState(0);
// function cubeNum(num) {
//   console.log("Calculation Done !");
//   return Math.pow(num, 3);
// }
// const result = useMemo(() => cubeNum(number), [number]);
// // useMemo(callBackFunction, dependencies)
// return (
//   <>
//     <input
//       type="number"
//       value={number}
//       onChange={(e) => {
//         setNumber(e.target.value);
//       }}
//     />
//     <h1>Cube of the Number : {result}</h1>
//     <button
//       onClick={() => {
//         setCounter(counter + 1);
//       }}
//     >
//       Counter++
//     </button>
//     <h1>Counter: {counter}</h1>
//   </>
// );
//______________________________________________________________________
//   useCallback Hook:
//______________________________________________________________________
// Example(1):
//______________________________________________________________________
// const [count, setCount] = useState(0);
// return (
//   <>
//     <Header />
//     <h1>{count}</h1>
//     <button
//       onClick={() => {
//         setCount((prev) => prev + 1);
//       }}
//     >
//       Click here
//     </button>
//   </>
// );
//___________________________________________________________________
//   Example(2):
//____________________________________________________________________
// const [count, setCount] = useState(0);
// const newfun = () => {};
// return (
//   <>
//     <Header newfun={newfun} />
//     <h1>{count}</h1>
//     <button
//       onClick={() => {
//         setCount((prev) => prev + 1);
//       }}
//     >
//       Click here
//     </button>
//   </>
// );
//________________________________________________________________________________
// Example(3):
//________________________________________________________________________________
// const [count, setCount] = useState(0);
// const newfun = useCallback(() => {}, []);
// //useCallback(call back function , dependencies)
// return (
//   <>
//     <Header newfun={newfun} />
//     <h1>{count}</h1>
//     <button
//       onClick={() => {
//         setCount((prev) => prev + 1);
//       }}
//     >
//       Click here
//     </button>
//   </>
// );
//_______________________________________________________________________________
// Example(4):
//_______________________________________________________________________________
// const [count, setCount] = useState(0);
// const newfun = useCallback((count) => {}, [count]);
// //useCallback(call back function , dependencies)
// return (
//   <>
//     <Header newfun={newfun} />
//     <h1>{count}</h1>
//     <button
//       onClick={() => {
//         setCount((prev) => prev + 1);
//       }}
//     >
//       Click here
//     </button>
//   </>
// );
//_____________________________________________________________________________
// useContext Hook :
//_____________________________________________________________________________
// Example(1):
// //_____________________________________________________________________________
// return (
//   <>
//     <Profile />
//     <Footer />
//   </>
// );
//_______________________________________________________________________________
//  useReducer Hook:
//_______________________________________________________________________________
// Example(1):
//_______________________________________________________________________________
// const [count, setCount] = useState(0);
// return (
//   <>
//     <h1>{count}</h1>
//     <button onClick={() => setCount(count + 1)}>Increase</button>
//     <button onClick={() => setCount(count - 1)}>Decrease</button>
//   </>
// );
//_________________________________________________________________________________
// Example(2):
//__________________________________________________________________________________
// the same above example things we can do with the help of useReducer hook:
// useReducer(reducer function , initialState) returns an
// array [state,dispatch function  ]
// reducer function takes 2 parameter first is state and second is action and this function returns the updated state.
// function App() {
//   const initialState = { count: 0 };
//   const reducer = (state, action) => {
//     switch (action.type) {
//       case "increase": {
//         return { count: state.count + 1 };
//       }
//       case "decrease": {
//         return { count: state.count - 1 };
//       }
//       default: {
//         return state;
//       }
//     }
//   };

//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <>
//       <h1>{state.count}</h1>
//       <button
//         onClick={() => {
//           dispatch({ type: "increase" });
//         }}
//       >
//         Increase
//       </button>
//       <button
//         onClick={() => {
//           dispatch({ type: "decrease" });
//         }}
//       >
//         Decrease
//       </button>
//     </>
//   );
//______________________________________________________________________________
// Example(2):
//______________________________________________________________________________

// function App() {
//   const initialState = { count: 0 };
//   const reducer = (state, action) => {
//     switch (action.type) {
//       case "increase": {
//         return { count: state.count + 1 };
//       }
//       case "decrease": {
//         return { count: state.count - 1 };
//       }

//       case "input": {
//         return { count: action.payload };
//       }
//       default: {
//         return state;
//       }
//     }
//   };

//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <>
//       <h1>{state.count}</h1>
//       <button
//         onClick={() => {
//           dispatch({ type: "increase" });
//         }}
//       >
//         Increase
//       </button>
//       <button
//         onClick={() => {
//           dispatch({ type: "decrease" });
//         }}
//       >
//         Decrease
//       </button>
//       <br />
//       <input
//         value={state.count}
//         onChange={(e) => {
//           dispatch({ type: "input", payload: Number(e.target.value) });
//         }}
//         type="number"
//       />
//     </>
//   );
//__________________________________________________________________________________
// useLayoutEffect Hook:
//__________________________________________________________________________________
//    Example(1):
//__________________________________________________________________________________

// function App() {
//   useEffect(() => {
//     console.log("Message from useEffect");
//   }, []);

//   useLayoutEffect(() => {
//     console.log("Message from useLayoutEffect");
//   }, []);
//   return (
//     <>
//       <h1>Text Message </h1>
//       {Array(4000)
//         .fill("")
//         .map((item, index) => (
//           <li key={index}>{Math.pow(Math.random(), 10)}</li>
//         ))}
//     </>
//   );
// }
//_____________________________________________________________________________________
// Custom Hook:
//_____________________________________________________________________________________

function App() {
  const [name, setName] = useLocalStorage("usename", "");
  const [id, setId] = useLocalStorage("useid", "");

  return (
    <>
      <input
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h2>Hello ,{name}! </h2>

      <input
        type="text"
        placeholder="Enter Your Id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <h2>Your Id : {id}! </h2>
    </>
  );
}

export default App;
