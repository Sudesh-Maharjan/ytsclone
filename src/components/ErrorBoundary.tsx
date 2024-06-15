import React from 'react'
import { BiSolidMessageSquareError } from "react-icons/bi";
//class extends react component
class ErrorBoundary extends  React.Component{
   //type any xa
   constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
//Error xa vani hasError = true hunxa
static getDerivedStateFromError(error){
   return { hasError: true}
}

//console ma return hunxa
componentDidCatch(error, info){
   console.log('Error caught by error boundary:',error, info)
}

render(){
   if(this.state.hasError){
      return (
         //UI return hunx
         <div className="flex justify-center items-center mt-40">
         <div className='flex flex-col items-center border-2 p-3 rounded-md justify-center'>
            <BiSolidMessageSquareError className='text-4xl text-red-600'/>
           <h2>Something went wrong from our side.</h2>
           <p>Please try again later....</p>
           <button className='border-2 border-red-500 p-2 rounded-md hover:bg-red-100 mt-2'>
           <a href='/'>Go to Home Page</a>
           </button>
         </div>
         </div>
       );
     }
     // error occur vayena vani chid element return hunxa
     return this.props.children;
   }
 }
export default ErrorBoundary
