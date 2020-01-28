import {ActionButton} from '@react-spectrum/button';
import {cleanup, fireEvent, render, wait, waitForDomChange, within} from '@testing-library/react';
import {Provider} from '@react-spectrum/provider';
import React from 'react';
import scaleMedium from '@adobe/spectrum-css-temp/vars/spectrum-medium-unique.css';
import themeLight from '@adobe/spectrum-css-temp/vars/spectrum-light-unique.css';
import {Tooltip, TooltipTrigger} from '../';
import {triggerPress} from '@react-spectrum/test-utils';

 let theme = {
  light: themeLight,
  medium: scaleMedium
};

 describe('TooltipTrigger', function () {
  let onOpen = jest.fn();
  let onClose = jest.fn();

   afterEach(() => {
    onOpen.mockClear();
    onClose.mockClear();
    cleanup();
  });

   describe('click related tests', function () {

     it('triggered by click event', function () {
      let {getByRole} = render(
        <Provider theme={theme}>
          <TooltipTrigger type="click">
            <ActionButton>Trigger</ActionButton>
            <Tooltip>content</Tooltip>
          </TooltipTrigger>
        </Provider>
      );

       expect(() => {
        getByRole('tooltip');
      }).toThrow();

       let button = getByRole('button');
      triggerPress(button);

       let tooltip = getByRole('tooltip');
      expect(tooltip).toBeVisible();

     });

     it('pressing esc should close the tooltip after a click event', async function () {
      let {getByRole} = render(
        <Provider theme={theme}>
          <TooltipTrigger type="click">
            <ActionButton>Trigger</ActionButton>
            <Tooltip>content</Tooltip>
          </TooltipTrigger>
        </Provider>
      );

       let button = getByRole('button');
      triggerPress(button);

       let tooltip = getByRole('tooltip');

       // wait for appearance
      await wait(() => {
        expect(tooltip).toBeInTheDocument();
      });

       fireEvent.keyDown(button, {key: 'Escape'});
      await waitForDomChange();

       expect(tooltip).not.toBeInTheDocument();
    });

     it('pressing keydown + altKey should close the tooltip after a click event', async function () {
      let {getByRole} = render(
        <Provider theme={theme}>
          <TooltipTrigger type="click">
            <ActionButton>Trigger</ActionButton>
            <Tooltip>content</Tooltip>
          </TooltipTrigger>
        </Provider>
      );

       let button = getByRole('button');
      triggerPress(button);

       let tooltip = getByRole('tooltip');

       // wait for appearance
      await wait(() => {
        expect(tooltip).toBeInTheDocument();
      });

       fireEvent.keyDown(button, {key: 'ArrowDown', altKey: true});
      await waitForDomChange();

       expect(tooltip).not.toBeInTheDocument();
    });

   });

   describe('hover related tests', function () {

     it('triggered by hover event', async function () {

       /* I was suprised none of this worked
       let {getByRole} = render(
        <Provider theme={theme}>
          <TooltipTrigger type="hover">
            <ActionButton>Trigger</ActionButton>
            <Tooltip>content</Tooltip>
          </TooltipTrigger>
        </Provider>
      );
       let button = getByRole('button');
      fireEvent.mouseEnter(button);
      fireEvent.mouseOver(button);
       // let tooltip = getByRole('tooltip');
      // let tooltip = getByText('content');
       await waitForDomChange();
      //expect(tooltip).toBeInTheDocument();
       // wait for appearance
      // await wait(() => {
      //   expect(tooltip).toBeInTheDocument();
      // });
       */

       let {getByText} = render(
        <Provider theme={theme}>
          <TooltipTrigger type="hover">
            <ActionButton>Trigger</ActionButton>
            <Tooltip>content</Tooltip>
          </TooltipTrigger>
        </Provider>
      );

       expect(() => {
        getByRole('tooltip');
      }).toThrow();

       let button = getByText('Trigger');
      fireEvent.mouseOver(button);

       await new Promise((r) => setTimeout(r, 400));

       let tooltip = getByText('content')
      expect(tooltip).toBeInTheDocument();

       fireEvent.mouseOut(button);

       await new Promise((r) => setTimeout(r, 400));

       expect(tooltip).not.toBeInTheDocument();

     });

     // TODO: will need to add a test when you go back to other branch you worked on with Daniel to have the tooltip not go away
        // when you are hovering over it
              // fireEvent.mouseOver(tooltip)

   });

   describe('focus related tests', function () {

     it('triggered by focus event', async function () {
      /*
      let {getByRole} = render(
        <Provider theme={theme}>
          <TooltipTrigger type="click">
            <ActionButton>Trigger</ActionButton>
            <Tooltip>content</Tooltip>
          </TooltipTrigger>
        </Provider>
      );
       let button = getByRole('button');
      fireEvent.focus(button);
       await wait(() => {
        expect(document.activeElement).toEqual(button));
      });
       // 1st test:
      // focus the button and then tooltip appears
       // 2nd test:
      // focus the button and then escape button should work
      */
    });

   });

   describe('single tooltip concept related tests', function () {

     it('triggered by hover event', async function () {

       let {getByText} = render(
        <Provider theme={theme}>
          <TooltipTrigger type="hover">
            <ActionButton>TriggerOne</ActionButton>
            <Tooltip>contentOne</Tooltip>
          </TooltipTrigger>

           <TooltipTrigger type="hover">
            <ActionButton>TriggerTwo</ActionButton>
            <Tooltip>contentTwo</Tooltip>
          </TooltipTrigger>
        </Provider>
      );

       expect(() => {
        getByRole('tooltip');
      }).toThrow();

       let buttonOne = getByText('TriggerOne');
      fireEvent.mouseOver(buttonOne);

       await new Promise((r) => setTimeout(r, 400));

       let tooltipOne = getByText('contentOne');
      expect(tooltipOne).toBeInTheDocument();

       fireEvent.mouseOut(buttonOne);

       let buttonTwo = getByText('TriggerTwo');
      fireEvent.mouseOver(buttonTwo);

       await new Promise((r) => setTimeout(r, 400));

       expect(tooltipOne).not.toBeInTheDocument();

       let tooltipTwo = getByText('contentTwo')
      expect(tooltipTwo).toBeInTheDocument();


     });

     it('triggered by click event', async function () {  // use the within keyword?

       let {getByText} = render(
        <Provider theme={theme}>
          <TooltipTrigger type="click">
            <ActionButton>TriggerOne</ActionButton>
            <Tooltip>contentOne</Tooltip>
          </TooltipTrigger>

           <TooltipTrigger type="click">
            <ActionButton>TriggerTwo</ActionButton>
            <Tooltip>contentTwo</Tooltip>
          </TooltipTrigger>
        </Provider>
      );

       expect(() => {
        getByRole('tooltip');
      }).toThrow();

       let buttonOne = getByText('TriggerOne');
      fireEvent.click(buttonOne);

       await new Promise((r) => setTimeout(r, 400));

       let tooltipOne = getByText('contentOne');
      expect(tooltipOne).toBeVisible();

       let buttonTwo = getByText('TriggerTwo');
      fireEvent.click(buttonTwo);

       await new Promise((r) => setTimeout(r, 400));

       let tooltipTwo = getByText('contentTwo');
      expect(tooltipTwo).toBeVisible();

       expect(tooltipOne).not.toBeVisible();

     });

     it('triggered by hover and click events', function () {

       let {getByText} = render(
        <Provider theme={theme}>
          <TooltipTrigger type="hover">
            <ActionButton>TriggerOne</ActionButton>
            <Tooltip>contentOne</Tooltip>
          </TooltipTrigger>

           <TooltipTrigger type="click">
            <ActionButton>TriggerTwo</ActionButton>
            <Tooltip>contentTwo</Tooltip>
          </TooltipTrigger>
        </Provider>
      );

     });

   });
 });
