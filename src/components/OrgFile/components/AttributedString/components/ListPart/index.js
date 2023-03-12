import React, { Fragment } from 'react';
import { UnmountClosed as Collapse } from 'react-collapse';

import './stylesheet.css';

import AttributedString from '../../../AttributedString/';
import Checkbox from '../../../../../UI/Checkbox/';

import classNames from 'classnames';

export default ({ part, subPartDataAndHandlers }) => {
  // TODO K.Matsuda handleCheckboxClick を復旧させる
  // const handleCheckboxClick = itemId => () => subPartDataAndHandlers.onCheckboxClick(itemId);
  const handleListItemSelect = (itemId) => () => subPartDataAndHandlers.onListItemSelect(itemId);

  const shouldDisableActions = subPartDataAndHandlers.shouldDisableActions;
  const selectedListItemId = subPartDataAndHandlers.selectedListItemId;
  const isListItemSelected = part
    .get('items')
    .some((item) => item.get('id') === selectedListItemId);

  const renderContent = () => {
    return part.get('items').map((item) => {
      const lineContainerClass = classNames({
        'list-part__checkbox-container': item.get('isCheckbox'),
      });

      return (
        <li key={item.get('id')} value={item.get('forceNumber')}>
          <span
            className={lineContainerClass}
            // TODO K.Matsuda handleCheckboxClick を復旧させる
            //onClick={item.get('isCheckbox') ? handleCheckboxClick(item.get('id')) : null}
            onClick={handleListItemSelect(item.get('id'))}
          >
            {item.get('isCheckbox') && <Checkbox state={item.get('checkboxState')} />}
            <AttributedString
              parts={item.get('titleLine')}
              subPartDataAndHandlers={subPartDataAndHandlers}
            />
          </span>
          <br />
          <AttributedString
            parts={item.get('contents')}
            subPartDataAndHandlers={subPartDataAndHandlers}
          />
        </li>
      );
    });
  };

  return (
    <Fragment>
      {part.get('isOrdered') ? (
        <ol className="attributed-string__list-part attributed-string__list-part--ordered">
          {renderContent()}
        </ol>
      ) : (
        <ul className="attributed-string__list-part">{renderContent()}</ul>
      )}
      <Collapse isOpened={isListItemSelected && !shouldDisableActions}>
        <ListActionDrawer subPartDataAndHandlers={subPartDataAndHandlers} />
      </Collapse>
    </Fragment>
  );
};
