# MomentTune ArtBox Service Definition

## Service Definition

ArtBox는 사용자의 감정 상태에 맞는 짧은 인터랙티브 세션을 추천하고 렌더링하는 감정 웰니스 콘텐츠 서비스입니다.

핵심 산출물은 작품 감상이 아닙니다. 핵심 산출물은 감정 전환입니다.

## Problem

사용자는 불안, 피로, 산만함, 외로움, 과자극을 느끼지만, 대부분의 디지털 제품은 더 많은 주의를 요구합니다.

기존 웰니스 경험은 때로 너무 수동적이거나, 너무 의료적이거나, 너무 길거나, 너무 일반적입니다.

## Solution

ArtBox는 사용자의 감정 상태와 맥락에 맞는 metadata-driven interactive content를 제공합니다.

서비스 흐름:

1. 사용자의 상태를 이해합니다.
2. 감정 목적에 맞는 콘텐츠 세션을 추천합니다.
3. 짧은 인터랙티브 경험을 렌더링합니다.
4. 피드백을 수집합니다.
5. 다음 추천을 개선합니다.

## Target User

Primary user:

- 감정 기반 콘텐츠 경험을 원하는 MomentTune 사용자
- 하루 중 짧은 웰니스 순간이 필요한 사용자
- 긴 명상이나 텍스트보다 감각적, 시각적, 인터랙티브 경험을 선호하는 사용자

Secondary user:

- 감정 리셋이 필요한 창작자
- 집중과 회복이 필요한 학생과 직장인
- 디지털 웰니스와 인터랙티브 미디어에 관심 있는 사용자

## JTBD

감정적으로 흐트러졌을 때, 나는 현재 상태에 맞는 짧은 인터랙티브 경험을 통해 더 안정되고 집중되거나 회복된 상태로 돌아가고 싶다.

## User Value

- 빠른 감정 리셋
- 낮은 인지 부담
- 아름다운 감각적 상호작용
- 추천을 통한 개인적 관련성
- 부드러운 피드백 루프

## User Story

잠들기 전 불안을 느끼는 사용자가 MomentTune ArtBox를 열고 자신의 감정을 확인합니다. ArtBox는 Calm 또는 Breathing 세션을 추천합니다. 사용자는 2분 동안 부드러운 시각 경험과 상호작용하고, 세션 후 더 안정된 상태를 기록합니다.

## Feature Priority

### P0

- 감정 입력
- 콘텐츠 metadata schema
- 추천 가능한 콘텐츠 목록
- interactive content viewer
- 모바일 지원
- sound optional mode
- session feedback

### P1

- recommendation scoring
- runtime configuration
- accessibility settings
- content preview
- analytics events

### P2

- AI personalization
- adaptive content parameters
- creator content format
- program-based wellness journey

## MVP

MVP는 핵심 루프를 검증해야 합니다.

Emotion input -> recommended content -> interactive session -> feedback

MVP 카테고리:

- Calm
- Focus
- Breathing

MVP 지표:

- 시작률
- 완료율
- 감정 개선률
- 모바일 완료율
- 반복 사용률

## Future Expansion

- HR, HRV, Sleep, Stress, Weather, Time 기반 추천
- AI 기반 motion, sound, palette, duration 조정
- 감정 인터랙티브 콘텐츠 creator ecosystem
- B2B wellness와 education program
