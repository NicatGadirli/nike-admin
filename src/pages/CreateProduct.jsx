import { useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  //?Navigate
  const navigate = useNavigate();
  //?Navigate

  //!UseState
  const [image, setImage] = useState(null);
  const [imgErr, setImgErr] = useState("");
  const [preview, setPreview] = useState("");
  //!UseState

  //?Schema
  const productSchema = object({
    name: string().required("Lütfen bu alanı doldurun.").trim(),
    details: string().required("Lütfen bu alanı doldurun.").trim(),
    price: string().required("Lütfen bu alanı doldurun.").trim().matches(/^\d+$/, "Sadece Rakamlar"),
  });
  //?Schema

  //! React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(productSchema),
  });
  //! React Hook Form

  //?Take Photo 
  const handleImage = (e) => {
    setImgErr("");
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setPreview(reader.result);
    };
    reader.onerror = function (error) {
      console.log(error);
    };
  };
  //?Take Photo 

  
  
  const onSubmit = async (data) => {
    if (image === null) {
      setImgErr("Fotoğraf Seçin.");
      return;
    } else {
      const body = new FormData();
      body.append("name", data.name);
      body.append("details", data.details);
      body.append("price", data.price);
      body.append("productImage", image);

      try {
        const response = await axios.post(process.env.REACT_APP_ALL_DATA, body);
        console.log(response);
        navigate("/all-product");
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  return (
    <section className="createProduct">
      <div className="container">
        <div className="row">
          <h2 className="title">Add new Product</h2>
          <div className="login-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="user-box">
                <input className="user-box" type="text" name="name" {...register("name")} />
                <label>Product Name</label>
              </div>
              {errors.name && <span>{errors.name.message}</span>}
              <div className="user-box">
                <input type="text" name="details" {...register("details")} />
                <label>Product Details</label>
              </div>
              {errors.details && <span>{errors.details.message}</span>}
              <div className="user-box">
                <input type="text" name="price" {...register("price")} />
                <label>Product Price</label>
              </div>
              {errors.price && <span>{errors.price.message}</span>}
              <div className="user-box">
                <input type="file" name="productImage" id="pImg" onChange={handleImage} />
                {preview && <div className="previewImage"><img src={preview} alt="uploaded-img" /></div>}
              </div>
              {imgErr && <span>{imgErr}</span>}
              <div className="btn">
                <button type="submit">Create Product</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateProduct;
