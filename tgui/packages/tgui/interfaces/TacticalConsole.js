import { Fragment } from 'inferno';
import { useBackend, useLocalState } from '../backend';
import { Box, Button, Section, ProgressBar, Knob, Flex, Tabs } from '../components';
import { Window } from '../layouts';

export const TacticalConsole = (props, context) => {
  const { act, data } = useBackend(context);
  const tabIndex = 1;
  return (
    <Window resizable theme="retro">
      <Window.Content scrollable>
        <Section>
          <Section title="Ship status">
            <Section title="Hull integrity:">
              <ProgressBar
                value={(data.integrity/data.max_integrity * 100)* 0.01}
                ranges={{
                  good: [0.95, Infinity],
                  average: [0.15, 0.9],
                  bad: [-Infinity, 0.15],
                }} />
            </Section>
            <Section title="Armour plates:">
              <ProgressBar
                value={(data.hullplates/data.max_hullplates * 100)* 0.01}
                ranges={{
                  good: [0.95, Infinity],
                  average: [0.15, 0.9],
                  bad: [-Infinity, 0.15],
                }} />
            </Section>
          </Section>
          <Section title="Armaments:">
            {Object.keys(data.weapons).map(key => {
              let value = data.weapons[key];
              return (
                <Fragment key={key}>
                  {!!value.maxammo && (
                    <Section title={`${value.name}`}>
                      <ProgressBar
                        value={(value.ammo/value.maxammo * 100)* 0.01}
                        ranges={{
                          good: [0.95, Infinity],
                          average: [0.15, 0.9],
                          bad: [-Infinity, 0.15],
                        }} />
                    </Section>
                  )}
                </Fragment>);
            })}
          </Section>
          <Section title="Tracking:">
            {Object.keys(data.ships).map(key => {
              let value = data.ships[key];
              return (
                <Fragment key={key}>
                  {!!value.name && (
                    <Section title={`${value.name}`}>
                      <ProgressBar
                        value={(
                          value.integrity/value.max_integrity * 100)* 0.01}
                        ranges={{
                          good: [0.95, Infinity],
                          average: [0.15, 0.9],
                          bad: [-Infinity, 0.15],
                        }} />
                      <br />
                      <br />
                      <Button
                        fluid
                        content={`Target ${value.name}`}
                        icon="bullseye"
                        onClick={() => 
                          act('target_ship', { target: value.name })} />
                    </Section>
                  )}
                </Fragment>);
            })}
          </Section>
        </Section>
      </Window.Content>
    </Window>
  );
};
