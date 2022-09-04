import React from "react";
import fs from "fs/promises";
import path from "path";

// getStaticProps does not work here because, Next.js does not know previously how many pid's should be supported, so dosnt know many pages to pre-render

const ProductDetailPage = (props) => {
  const { loadedProduct } = props;

  //   when we make fallback to true
    if(!loadedProduct){
      return <p>Loading...</p>
    }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
};

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if(!product){
    return {notFound:true};
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
//   console.log(data);
  const ids = data.products.map((product) => product.id);
  const params = ids.map((id) => ({ params: { pid: id } }));
  return {
    paths: params,
    fallback: true,
  };
}

export default ProductDetailPage;
