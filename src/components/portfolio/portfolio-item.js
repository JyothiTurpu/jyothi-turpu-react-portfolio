import React from 'react';
import { Link } from 'react-router-dom';
export default function(props) {
  // Data that we will need 
  // - Background image: thumb_image_url
  // - Logo : 
  // - Description : description
  // - ID (Slug): id
  // ["id", "name", "description", "url", "category", "position", "", "banner_image_url", "logo_url", "column_names_merged_with_images"]
  const { id, description, thumb_image_url, logo } = props.item;
  return (
    <div>
      <img src={thumb_image_url} alt="Thumb Image URL" />
      <img src={logo} alt="LOGO" />
      <Link to = {`/portfolio/${id}`}>Link</Link>
    </div>
  );
}