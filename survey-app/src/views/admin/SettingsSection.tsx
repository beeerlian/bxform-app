import { Forms } from '@/__generated__/graphql';
import BaseModal from '@/components/BaseModal';
import CopyableField from '@/components/CopyableField';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import EditQuissionareSetting from './EditQuestionnaireSettings';

interface SettingsSectionProps {
  questionnaire: Forms;
  refetch: (variables?: Partial<any> | undefined) => Promise<any>;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ questionnaire, refetch }) => {
  const [isOpenEM, setModalEM] = useState<boolean>(false);

  function onEditQuestionareSuccess(): void {
    setModalEM(false);
    toast.success('Questionnaire updated');
    refetch();
  }

  return (
    <div className="w-full">
      <div className="space-y-4 mx-auto">
        <div className="">
          <p className="text-md font-bold">Title</p>
          <p className="font-normal">{questionnaire.title}</p>
          <div className="flex mt-4">
            <div className="w-1/2">
              <p className="text-md font-bold">Starting at</p>
              <p className="font-normal">{questionnaire.start_date ?? '-'}</p>
            </div>
            <div className="w-1/2">
              <p className="text-md font-bold">End at</p>
              <p className="font-normal">{questionnaire.end_date ?? '-'}</p>
            </div>
          </div>
        </div>
        <div className="">
          <p className="text-md font-bold">Target Audience</p>
          <p className="font-normal">{questionnaire.target_audience}</p>
        </div>
        <div className="">
          <p className="text-md font-bold">Access</p>
          <p className="font-normal">
            {questionnaire.is_public
              ? 'This quessionare is open form public'
              : 'This quessionare is private, need password to access'}
          </p>
        </div>
        <div className="">
          <p className="text-md font-bold">Public Link</p>
          <CopyableField
            disabled
            value={window.location.origin + '/survey/' + questionnaire.public_id}
          />
        </div>

        <div className="flex space-x-2 justify-end mt-8">
          <button
            onClick={() => setModalEM(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Edit Settings
          </button>
          {questionnaire.status === 1 && (
            <button
              onClick={() => setModalEM(true)}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Publish Now
            </button>
          )}
          {questionnaire.status === 2 && (
            <button
              onClick={() => setModalEM(true)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Close Now
            </button>
          )}
          {questionnaire.status === 3 && (
            <button
              onClick={() => setModalEM(true)}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Open Again
            </button>
          )}
        </div>
        <BaseModal
          isOpen={isOpenEM}
          onClose={() => setModalEM(false)}
          title="Remove Question"
          style={{ content: { minWidth: '60%', margin: 'auto' } }}
        >
          <EditQuissionareSetting
            quessionare={questionnaire}
            onSuccess={onEditQuestionareSuccess}
          />
        </BaseModal>
      </div>
    </div>
  );
};

export default SettingsSection;
