import express from 'express';
import bodyParser from 'body-parser';
import StatusCodes from 'http-status-codes';
import {filterImageFromURL, deleteLocalFiles} from './util/util.js';



  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

    /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/filteredimage/:image_url", async (req, res) => {
    var image_url = req.params.image_url 
    
    // check image url
    if(!isImgUrl(image_url)) {
      res.statusCode = StatusCodes.BAD_REQUEST;
      res.send("invalid image URL")
      return
    }

    await filterImageFromURL(image_url).then (
      function(image) {
        response.statusCode = StatusCodes.OK;
        res.sendFile(image)
        deleteLocalFiles(image)
      }
    )
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );

  // check image url
  function isImgUrl(url) {
    if(typeof url !== 'string' || !url || url === "") return false;
    return(url.match(/^http[^\?]*.(jpg|jpeg|png|bmp)(\?(.*))?$/gmi) != null);
  }