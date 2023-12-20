import CenterAlignedContainer from "./CenterAlignedContainer";

//Center aligned loading indicator
function Loader() {
  return (
    <CenterAlignedContainer>
          <div className="text-center">
              <div className="spinner-border text-primary" role="status">
              </div>
          </div>
    </CenterAlignedContainer>
  )
}

export default Loader;