import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';

type CardProps = React.ComponentProps<typeof Card>;

import placeholder from './fslur.jpg';
import { Button } from '../ui/button';
import { Separator } from '@radix-ui/react-separator';

export const RecipeCard = ({ className, title, ...props }: CardProps) => {
  return (
    <Card className="m-4 w-60" {...props}>
      <Image
        className="overflow-clip"
        src={placeholder}
        width={`${300}`}
        height={300}
        alt="peecture"
      />

      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button className="">View Recipe</Button>
      </CardContent>
    </Card>
  );
};
