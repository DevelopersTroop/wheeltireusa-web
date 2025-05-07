import { Button } from '@/components/ui/button';
import Text from '@/lib/generic-form/fields/Text';
import GenericForm from '@/lib/generic-form/GenericForm';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(5),
  email: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type TFieldValues = z.infer<typeof formSchema>;

const defaultValues: TFieldValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  address: '',
};

const ExampleForm2 = () => {
  const onSubmit = (data: TFieldValues) => {
    console.log(data);
  };

  return (
    <div className="w-96 mx-auto mt-20">
      <GenericForm
        schema={formSchema}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      >
        <div>
          <Text<TFieldValues>
            name="name"
            placeholder="Enter your name"
            heading="Full Name"
            description="Enter your full name"
            showMessage={true}
          />
        </div>
        <div>
          <Text<TFieldValues>
            name="email"
            placeholder="Enter your email"
            heading="Email"
            description="Enter your email"
            showMessage={true}
          />
        </div>
        <div>
          <Text<TFieldValues>
            name="password"
            placeholder="Enter your password"
            heading="Password"
            description="Enter your password"
            showMessage={true}
          />
        </div>
        <div>
          <Text<TFieldValues>
            name="confirmPassword"
            placeholder="Enter your confirm password"
            heading="Confirm Password"
            description="Enter your confirm password"
            showMessage={true}
          />
        </div>
        <div>
          <Text<TFieldValues>
            name="phone"
            placeholder="Enter your phone"
            heading="Phone"
            description="Enter your phone"
            showMessage={true}
          />
        </div>
        <div>
          <Text<TFieldValues>
            name="address"
            placeholder="Enter your address"
            heading="Address"
            description="Enter your address"
            showMessage={true}
          />
        </div>
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </GenericForm>
    </div>
  );
};

export default ExampleForm2;
