// Define the type for the component's props

type Props = {
    // The 'collapseName' prop should match the ID of the container in the parent component
    collapseName:string
};

// Functional component representing the 'ShowMore' button
function ShowMore(props:Props){
    return (
        <div className="badge bg-secondary m-2">
            <a className="text-decoration-none link-light" 
            data-bs-toggle="collapse" href={`#collapse${props.collapseName}`} 
            role="button" 
            aria-expanded="false">
            ...
            </a>
      </div>
    );
}

export default ShowMore;