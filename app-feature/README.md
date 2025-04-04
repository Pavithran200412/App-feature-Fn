💡 Example with Local/Dynamic Image (Optional)
If you are dynamically generating a graph (e.g. from an API or chart library), you can update the image source dynamically with a state:


code: 

const [graphUrl, setGraphUrl] = useState("your_generated_image_url_here");

// Inside JSX
<img src={graphUrl} alt="Generated Graph" className="graph-image" />
