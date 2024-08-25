
export default function ErrorPage() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="mt-3">Opps!</h1>
            <p>Sorry, an unexpected error has occured.</p>
            <p>
              <em>Error Message</em>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
