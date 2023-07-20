import React from 'react';
import placeholder from '@/public/placeholder.jpeg';
import Image from 'next/image';

interface props {
  recipeData: {
    title: string;
    createdAt: Date;
    description: string;
    ingredients: string;
    instructions: string;
  };
}

export const RecipeContainer = ({ recipeData }: props) => {
  return (
    <div className="container mt-10">
      <div className="flex h-[70vh] w-[70vw] flex-wrap justify-around rounded-md border  p-8 md:h-[80vh]">
        <div>
          <h1 className="text-[2rem] font-bold">{recipeData.title}</h1>
          <span>{recipeData.description}</span>
          <div className="m-4 p-8 pb-24 text-xl">
            <p>{recipeData.ingredients}</p>
            <p>{recipeData.instructions}</p>
          </div>
        </div>
        <div className="flex h-fit justify-center ">
          <Image
            className="m-4 rounded"
            src={placeholder}
            width={400}
            alt="placeholder"
          />
        </div>
      </div>
    </div>
  );
};
