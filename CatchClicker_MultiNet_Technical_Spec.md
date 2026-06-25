# CatchClicker MultiNet - Technical Specification

## Purpose

CatchClicker MultiNet is a physical handheld counting/timer device with a segmented LCD-style screen, six physical buttons, and a piezo buzzer. Its main purpose is to let the user enter weights, assign them to one of six nets, track totals, and use either stopwatch or timer mode while working.

The current web version is only a virtual prototype. This document describes the intended physical device behavior and should be usable as a reference for rebuilding the firmware or rewriting the prototype from scratch.

## Hardware Interface

The device has:

- One segmented display area.
- Six buttons:
  - PLUS
  - MINUS
  - SAVE
  - RESET / PAUSE
  - ADJUST
  - NET
- One piezo buzzer.
- A battery indicator shown on the display.

## Display

The display is initially fully off.

After the first button press, the display turns on and shows the active operating interface. The first press only powers the screen and must not execute the pressed button's normal action.

The display contains:

- Weight input value.
- Total weight in all nets.
- Stopwatch / timer value.
- Six individual net weight values.
- Active net identificator.
- Current clock time.
- Battery indicator.

All numeric values use a 7-segment digital display style.

Segment colors:

- Active segment color: `#373435`
- Inactive segment: same color at approximately 1% opacity

Inactive segments should not be covered by masks or overlays. They should be rendered as their own segments in an inactive visual state.

## Power-On Behavior

Initial state:

- Screen is off.
- All dynamic display elements are hidden.
- All buttons are available only for waking the device.

First press of any button:

- Turns on the screen.
- Starts the clock display.
- Starts stopwatch mode from zero.
- Does not execute PLUS, MINUS, SAVE, RESET, ADJUST, or NET logic.

## Clock

The clock displays the current time.

The clock is not reset by long-press reset.

## Weight Input

`Weight` is the current value that will be saved into the active net.

Initial value:

- `0`

Range:

- `0` to `999`

Controls:

- PLUS short press: increases Weight by 1.
- MINUS short press: decreases Weight by 1.
- PLUS long press, 1 second: resets Weight to 0.
- MINUS long press, 1 second: resets Weight to 0.

Weight must stay inside the valid range.

## Nets

The device has six nets:

- Net 1
- Net 2
- Net 3
- Net 4
- Net 5
- Net 6

Each net stores its own accumulated weight.

Initial values:

- Net 1 = 0
- Net 2 = 0
- Net 3 = 0
- Net 4 = 0
- Net 5 = 0
- Net 6 = 0

Initial active net:

- Net 1

Only the active net identificator should be shown as active. All other net identificators should be inactive/off.

## NET Button

The NET button cycles the active net.

Cycle order:

`Net 1 -> Net 2 -> Net 3 -> Net 4 -> Net 5 -> Net 6 -> Net 1`

Changing the active net does not change the current Weight value.

## SAVE Button

The SAVE button adds the current Weight value to the active net.

Example:

- Active net: Net 3
- Current Weight: 12
- Current Net 3 value: 40
- After SAVE: Net 3 = 52

SAVE must also update `Total in all Nets`.

`Total in all Nets` is always:

`Net 1 + Net 2 + Net 3 + Net 4 + Net 5 + Net 6`

Additional behavior:

- In stopwatch mode, SAVE resets and restarts the stopwatch.
- In timer mode, SAVE restarts the timer from the saved timer preset.
- In timer mode, SAVE must still add Weight to the active net.

## Stopwatch Mode

Stopwatch mode is the default mode after power-on.

On power-on:

- Stopwatch starts from zero.
- Stopwatch begins counting immediately.

The stopwatch must show fractional seconds, not only whole seconds. The final digits should represent the fractional part of the second according to the display design.

SAVE behavior in stopwatch mode:

- Adds Weight to the active net.
- Resets stopwatch to zero.
- Starts stopwatch again immediately.

RESET / PAUSE short press:

- First short press pauses the stopwatch.
- Second short press resets the stopwatch to zero and starts it again.

RESET / PAUSE long press, 1 second:

- Resets everything except the clock.
- Weight becomes 0.
- All net values become 0.
- Active net becomes Net 1.
- Stopwatch resets to zero and starts again.
- Timer mode is turned off.
- Clock continues showing the current time.
- At the long-press action moment, the buzzer gives two short beeps if silent mode is off.

## Timer Mode

Timer mode is entered using the ADJUST button.

### Entering Timer Setup

From stopwatch mode:

- ADJUST short press enters timer setup mode.
- The minutes field starts blinking.

While minutes are blinking:

- PLUS increases minutes.
- MINUS decreases minutes.
- PLUS long press, 1 second: resets minutes to 0.
- MINUS long press, 1 second: resets minutes to 0.

Second ADJUST short press:

- Moves setup from minutes to seconds.
- Seconds field starts blinking.

While seconds are blinking:

- PLUS increases seconds.
- MINUS decreases seconds.
- PLUS long press, 1 second: resets seconds to 0.
- MINUS long press, 1 second: resets seconds to 0.

Third ADJUST short press:

- Exits timer setup mode.
- Starts countdown if timer value is greater than zero.

Automatic exit:

- If no button is pressed for 5 seconds during timer setup, setup mode exits automatically.

### Timer Preset Memory

The selected timer value must be saved as the timer preset.

The timer preset must remain saved until the user manually sets timer minutes and seconds to `00:00`.

Countdown progress must not overwrite the saved preset.

Example:

- User sets timer to 02:30.
- Timer counts down to 00:00.
- Saved preset remains 02:30.
- Pressing SAVE starts a new countdown from 02:30.

### Timer Countdown

Timer countdown counts backward from the saved timer preset.

The timer display must show fractional seconds counting backward.

When timer reaches zero:

- Countdown stops.
- Alarm plays if silent mode is off.
- Alarm pattern is three short beeps repeated three times.
- Total alarm output: 3 groups x 3 beeps = 9 short beeps.

### Exiting Timer Mode

If the user manually sets timer minutes and seconds to `00:00`, timer mode is disabled.

When timer mode is disabled:

- Device returns to stopwatch mode.
- Stopwatch starts from zero.

## ADJUST Button

ADJUST short press:

- From stopwatch mode: enters timer setup, starting with minutes.
- In timer setup minutes field: moves to seconds field.
- In timer setup seconds field: exits setup and starts timer if timer value is greater than zero.

ADJUST long press, 2 seconds:

- Toggles silent mode.
- Plays 3 short confirmation beeps at the moment the 2-second action triggers.

If the screen is off, ADJUST long press must only power on the screen and must not toggle silent mode.

## Silent Mode

Silent mode turns off buzzer output.

Turning silent mode on:

- Press and hold ADJUST for 2 seconds.
- At the 2-second trigger point, play 3 short confirmation beeps.
- After confirmation, silent mode is active.

Turning silent mode off:

- Press and hold ADJUST for 2 seconds again.
- At the 2-second trigger point, play 3 short confirmation beeps.
- After confirmation, buzzer sounds are active again.

The 3 confirmation beeps must be audible even when silent mode is being enabled or disabled.

When silent mode is active, all other buzzer sounds are disabled, including:

- Button press beep
- Long-press double beep
- Timer alarm

## Buzzer

The buzzer should behave like a short piezo buzzer.

Target sound:

- Similar to PKMCS0909E4000-R1
- 4 kHz square wave
- Short beep
- Sharp attack and decay

Button short press:

- One short beep if silent mode is off.

Long press actions:

- PLUS / MINUS / RESET long press actions use two short beeps if silent mode is off.

Timer alarm:

- Three short beeps repeated three times if silent mode is off.

Silent mode toggle:

- Three short confirmation beeps, forced audible.

## Long Press Timing

Long press durations:

- PLUS: 1 second
- MINUS: 1 second
- RESET / PAUSE: 1 second
- ADJUST silent mode toggle: 2 seconds

The long press action should execute exactly when the required duration is reached, not after button release.

## State Reset Rules

RESET / PAUSE long press resets:

- Weight
- All net values
- Active net
- Stopwatch elapsed time
- Stopwatch pause state
- Timer mode
- Timer setup state
- Timer running state
- Timer alarm state

RESET / PAUSE long press does not reset:

- Current clock time
- Device power-on state
- Silent mode state

## Implementation Notes

The device behavior should be implemented as a state machine.

Recommended top-level state values:

- Powered off / powered on
- Stopwatch mode / timer mode
- Stopwatch running / stopwatch paused
- Timer setup minutes / timer setup seconds / timer running / timer finished
- Silent mode on / off
- Active net index

Button handling should separate:

- First press power-on behavior
- Short press behavior
- Long press behavior
- Repeated timer setup inactivity timeout

Display rendering should be driven from state. Display segments should not be hidden by overlay elements. Each segment should have its own active or inactive visual state.
