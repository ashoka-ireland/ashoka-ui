import React from 'react';
import { map } from 'lodash';
import { factories } from './fields';
import questionnaire from './questionnaire';

export const buildField = (field, formItemLayout, form) => (
  factories[field.type](field, formItemLayout, form)
);

export const buildSection = (section, formItemLayout, form) => {
  return (
    <div key={section.title}>
      <h2>{section.title}</h2>
      <hr className="divider secondary" />
      { map(section.fields, (f) => buildField(f, formItemLayout, form)) }
    </div>
  );
};

export const buildSurvey = (formItemLayout, form) => {
  return map(questionnaire, (s) => buildSection(s, formItemLayout, form));
};
