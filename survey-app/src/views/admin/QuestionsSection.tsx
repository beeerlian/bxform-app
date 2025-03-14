import { Questions } from '@/__generated__/graphql';
import BaseModal from '@/components/BaseModal';
import IpaOption from '@/components/IPAOptions';
import MultipleOption from '@/components/MultipleOptions';
import QuestionTypeChip from '@/components/QuestionTypeChip';
import RatioOption from '@/components/RatioOptions';
import { ModalWithPropsType } from '@/types/dto-types';
import { isNonEmptyArray } from '@apollo/client/utilities';
import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import AddQuestion from './crud-question/AddQuestion';
import EditQuestion from './crud-question/EditQuestion';
import RemoveQuestion from './crud-question/RemoveQuestion';

interface QuestionsSectionProps {
  questions: Questions[];
  quissionareId: string;
  refetch: (variables?: Partial<any> | undefined) => Promise<any>;
}

const QuestionsSection: React.FC<QuestionsSectionProps> = ({
  questions,
  quissionareId,
  refetch,
}) => {
  const [editModal, setEditModal] = useState<ModalWithPropsType<Questions>>({
    isOpen: false,
    props: null,
  });
  const [removeModal, setRemoveModal] = useState<ModalWithPropsType<string>>({
    isOpen: false,
    props: null,
  });
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  const editQuestion = (question: Questions) => {
    setEditModal({ isOpen: true, props: question });
  };

  const closeModal = () => {
    setEditModal((prev) => ({ ...prev, isOpen: false }));
  };

  const openAddModal = () => {
    setAddModalIsOpen(true);
  };

  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };
  const openRemoveModal = (id: string) => {
    setRemoveModal({ isOpen: true, props: id });
  };

  const closeRemoveModal = () => {
    setRemoveModal({ isOpen: false, props: null });
  };

  const onUpdateQuestionSuccess = () => {
    closeModal();
    refetch();
  };

  const onAddQuestionSuccess = () => {
    closeAddModal();
    refetch();
  };

  const onRemoveQuestionSuccess = () => {
    closeRemoveModal();
    refetch();
  };
  const onRemoveQuestionCancel = () => {
    closeRemoveModal();
  };

  const renderQuestion = (question: Questions) => {
    switch (question.option?.type) {
      case 'Multiple':
        return <MultipleOption data={question.option} disabled />;
      case 'Ratio':
        return <RatioOption data={question.option} disabled />;

      case 'Importance Performance':
        return <IpaOption data={question.option} disabled />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <div key={question.id} className="flex flex-row gap-2">
          <div className="border p-4 rounded-xl w-full">
            <div className="flex gap-2 justify-end">
              {question.required == true && (
                <div className="flex items-center justify-center px-2 rounded bg-red-100 text-red-500 text-xs">
                  Required
                </div>
              )}
              <QuestionTypeChip type={question.option?.type} />
            </div>
            <h2 className="font-semibold mb-2">{question.content}</h2>
            {renderQuestion(question)}
          </div>

          <div className="flex flex-col gap-1">
            <button
              className={`mr-2 px-4 py-2 bg-blue-500 text-white h-min rounded`}
              onClick={() => editQuestion(question)}
            >
              <MdOutlineEdit />
            </button>
            <button
              className={`mr-2 px-4 py-2 bg-red-500 text-white h-min rounded`}
              onClick={() => openRemoveModal(question.id)}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
      <button
        key={'add-question'}
        className="bg-green-500 py-2 px-4 rounded-full"
        onClick={() => openAddModal()}
      >
        <div className="flex flex-row gap-2 items-center">
          <FaPlus style={{ color: 'white' }} />
          <p className="font-semibold text-white">Tambah Pertanyaan</p>
        </div>
      </button>
      <BaseModal
        isOpen={editModal.isOpen && editModal.props != null}
        onClose={closeModal}
        title="Edit Question"
      >
        <EditQuestion question={editModal.props!} onSuccess={onUpdateQuestionSuccess} />
      </BaseModal>
      <BaseModal
        isOpen={addModalIsOpen}
        onClose={closeAddModal}
        title="Add Question"
        style={{ content: { minWidth: '80%' } }}
      >
        <AddQuestion
          formId={quissionareId}
          onSuccess={onAddQuestionSuccess}
          order={isNonEmptyArray(questions) ? (questions[questions.length - 1].order ?? 0) + 1 : 1}
        />
      </BaseModal>
      <BaseModal
        isOpen={removeModal.isOpen}
        onClose={closeRemoveModal}
        title="Remove Question"
        style={{ content: { minWidth: '20%' } }}
      >
        <RemoveQuestion
          questionId={removeModal.props!}
          onSuccess={onRemoveQuestionSuccess}
          onCancel={onRemoveQuestionCancel}
        />
      </BaseModal>
    </div>
  );
};

export default QuestionsSection;
