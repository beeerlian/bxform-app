import { Forms } from '@/__generated__/graphql';
import { FORM } from '@/apollo/Operations';
import Spinner from '@/components/Spinner';
import { toDate } from '@/utils/string.util';
import { ApolloError, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { toast } from 'react-toastify';

interface Props {
  quessionare: Forms;
  onSuccess: () => void;
}

const EditQuissionareSetting: React.FC<Props> = ({ onSuccess, quessionare }) => {
  const [editF, { data: editFData, loading: editFLoading, error: editFError }] = useMutation(
    FORM.UPDATE
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      title: quessionare.title ?? '', // text type input
      end_date: toDate(quessionare.end_date), // datepicker input
      start_date: toDate(quessionare.start_date), // datepicker input
      password: quessionare.password, // text type input
      target_audience: quessionare.target_audience, // number type input
      is_public: quessionare.is_public ? true : false, // boolean type input
    },
  });

  const isPublic = watch('is_public');

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      editF({
        variables: {
          id: quessionare.id,
          ...data,
        },
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        toast.error(error.message);
      } else {
        toast.error('Gagal memuat');
      }
    }
  };

  useEffect(() => {
    if (editFData) {
      onSuccess();
    }
    if (editFError) {
      toast.error(editFError.message);
    }
  }, [editFData, editFError]);

  return (
    <div className="max-w mx-auto p-4">
      {
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  {...field}
                  value={field.value ?? ''}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.title && (
                  <span className="text-red-500 text-sm">{errors.title.message}</span>
                )}
              </div>
            )}
          />

          <div className="grid grid-cols-2 gap-2">
            <Controller
              name="start_date"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dropdownMode="select"
                    isClearable
                    minDate={new Date()}
                    showYearDropdown
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  {errors.start_date && (
                    <span className="text-red-500 text-sm">{errors.start_date.message}</span>
                  )}
                </div>
              )}
            />
            <Controller
              name="end_date"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dropdownMode="select"
                    isClearable
                    minDate={new Date()}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  {errors.end_date && (
                    <span className="text-red-500 text-sm">{errors.end_date.message}</span>
                  )}
                </div>
              )}
            />
          </div>

          <Controller
            name="target_audience"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700">Target Audience</label>
                <input
                  type="number"
                  {...field}
                  value={field.value ? field.value : ''}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.target_audience && (
                  <span className="text-red-500 text-sm">{errors.target_audience.message}</span>
                )}
              </div>
            )}
          />

          <div className="flex items-center ">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      disabled={isPublic}
                      {...field}
                      value={field.value ?? ''}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      {showPassword ? (
                        <IoMdEyeOff className="h-5 w-5 text-gray-500" />
                      ) : (
                        <IoMdEye className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="text-red-500 text-sm">{errors.password.message}</span>
                  )}
                </div>
              )}
            />
            <p className="font-normal text-gray-600 mx-4">Or</p>
            <Controller
              name="is_public"
              control={control}
              render={({ field }) => (
                <div className="flex">
                  <input
                    type="checkbox"
                    {...field}
                    checked={field.value}
                    value={field.value.toString()}
                    className="border-gray-300 rounded-full mr-2"
                  />
                  <label className="text-sm font-medium text-gray-700">Set For Public</label>

                  {errors.is_public && (
                    <span className="text-red-500 text-sm">{errors.is_public.message}</span>
                  )}
                </div>
              )}
            />
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="submit"
              disabled={editFLoading}
              className={`px-4 py-2 bg-blue-500 text-white rounded ${
                editFLoading ? 'opacity-50' : ''
              }`}
            >
              {editFLoading ? <Spinner /> : 'Save'}
            </button>
          </div>
        </form>
      }
    </div>
  );
};

export default EditQuissionareSetting;
