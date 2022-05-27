import React from 'react';
import {
  FormGroup,
  FormControl,
  HelpBlock,
  ButtonToolbar,
  Button,
  ProgressBar
} from 'react-bootstrap';
import sentiment from 'sentiment';

const getSentiment = (words: string) => {
  const Sentiment = new sentiment();
  return Sentiment.analyze(words).score > 0;
};

type EditorProps = {
  data: { words: string; disabled: boolean; updated: string };
  minLength: number;
  onChange: (event: any) => void;
  onSubmit: () => void;
};

const Editor = ({
  data: { words, disabled, updated },
  minLength,
  onChange,
  onSubmit
}: EditorProps) => {
  const length = words ? words.match(/\S+/g)?.length : 0;
  const percentage =
    words && length ? Math.floor((length * 100) / minLength) : 0;

  return (
    <form>
      <ProgressBar
        now={percentage}
        label={`${percentage}% (${length})`}
        bsStyle={length && length >= minLength ? 'success' : undefined}
      />
      <FormGroup controlId="formControlsTextarea">
        <FormControl
          name="words"
          value={words}
          onChange={onChange}
          componentClass="textarea"
          placeholder="Write here, let's go!"
          rows={20}
          readOnly={disabled}
        />
      </FormGroup>
      <HelpBlock>
        Your words of the day are stored locally, and can only be viewed on this
        browser.
      </HelpBlock>
      <ButtonToolbar>
        <Button bsStyle="primary" onClick={onSubmit}>
          {updated ? `Saved at ${updated}` : 'Save'}
        </Button>

        <Button bsStyle={getSentiment(words) ? 'success' : 'danger'}>
          Sentiment: {getSentiment(words) ? 'Positive' : 'Negative'}
        </Button>
      </ButtonToolbar>
    </form>
  );
};

export default Editor;
