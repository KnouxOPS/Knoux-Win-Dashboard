import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AppSettings } from '../types';
import { cyberpunkTheme } from '../themes/cyberpunk';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: ${cyberpunkTheme.gradients.card};
  border-radius: 15px;
  padding: 30px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  border: 1px solid ${cyberpunkTheme.colors.primary};
  position: relative;
  overflow: hidden;
  max-height: 90vh;
  overflow-y: auto;
  color: #fff;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid ${cyberpunkTheme.colors.primary};
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: ${cyberpunkTheme.colors.primary};
  font-size: 24px;
  text-shadow: 0 0 10px rgba(0, 245, 255, 0.5);
  font-weight: 700;
`;

const CloseButton = styled.button`
  background: none;
  border: 2px solid ${cyberpunkTheme.colors.secondary};
  color: ${cyberpunkTheme.colors.secondary};
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${cyberpunkTheme.colors.secondary};
    color: #000;
    box-shadow: 0 0 15px ${cyberpunkTheme.colors.secondary};
  }
`;

const SettingsSection = styled.div`
  margin-bottom: 25px;
`;

const SectionTitle = styled.h3`
  color: ${cyberpunkTheme.colors.primary};
  margin: 0 0 15px 0;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background: rgba(26, 26, 46, 0.7);
  border-radius: 10px;
  margin-bottom: 10px;
  border: 1px solid rgba(0, 245, 255, 0.3);
  
  &:hover {
    background: rgba(26, 26, 46, 0.9);
    border-color: ${cyberpunkTheme.colors.primary};
  }
`;

const SettingLabel = styled.label`
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, #ff00ff, #00f5ff);
  transition: .4s;
  border-radius: 34px;
  
  &:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  
  ${ToggleInput}:checked + & {
    background: linear-gradient(90deg, #00f5ff, #ff00ff);
  }
  
  ${ToggleInput}:checked + &:before {
    transform: translateX(30px);
  }
`;

const Select = styled.select`
  background: linear-gradient(145deg, #2d2d4d, #1a1a2e);
  color: ${cyberpunkTheme.colors.primary};
  border: 2px solid ${cyberpunkTheme.colors.primary};
  padding: 8px 15px;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 15px rgba(0, 245, 255, 0.5);
  }
  
  option {
    background: #1a1a2e;
    color: #fff;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
`;

interface ActionButtonProps {
  primary?: boolean;
}

const ActionButton = styled.button<ActionButtonProps>`
  flex: 1;
  background: linear-gradient(145deg, ${props => props.primary ? '#00f5ff' : '#ff00ff'}, ${props => props.primary ? '#008cff' : '#8c00ff'});
  color: ${props => props.primary ? '#000' : '#fff'};
  border: none;
  padding: 15px 25px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px ${props => props.primary ? 'rgba(0, 245, 255, 0.4)' : 'rgba(255, 0, 255, 0.4)'};
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const ColorPicker = styled.input`
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: transparent;
  
  &::-webkit-color-swatch {
    border-radius: 5px;
    border: 2px solid ${cyberpunkTheme.colors.primary};
  }
  
  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
`;

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, settings, onSettingsChange }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSettingChange = (key: keyof AppSettings, value: any) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>⚙️ إعدادات النظام</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        {/* Visual Settings */}
        <SettingsSection>
          <SectionTitle>🎨 مظهر وواجهة</SectionTitle>
          
          <SettingRow>
            <SettingLabel>
              <span>🌙 الوضع الليلي</span>
            </SettingLabel>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={localSettings.theme === 'dark'}
                onChange={(e) => handleSettingChange('theme', e.target.checked ? 'dark' : 'light')}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingRow>

          <SettingRow>
            <SettingLabel>
              <span>✨ التأثيرات البصرية</span>
            </SettingLabel>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={localSettings.visualEffects}
                onChange={(e) => handleSettingChange('visualEffects', e.target.checked)}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingRow>

          <SettingRow>
            <SettingLabel>
              <span>💫 التوهج السايبر بانك</span>
            </SettingLabel>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={localSettings.cyberGlow}
                onChange={(e) => handleSettingChange('cyberGlow', e.target.checked)}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingRow>

          <SettingRow>
            <SettingLabel>
              <span>🎯 سرعة التأثيرات</span>
            </SettingLabel>
            <Select
              value={localSettings.animationSpeed}
              onChange={(e) => handleSettingChange('animationSpeed', e.target.value)}
            >
              <option value="slow">بطيئة</option>
              <option value="normal">عادية</option>
              <option value="fast">سريعة</option>
            </Select>
          </SettingRow>
        </SettingsSection>

        {/* Performance Settings */}
        <SettingsSection>
          <SectionTitle>⚡ أداء النظام</SectionTitle>
          
          <SettingRow>
            <SettingLabel>
              <span>🔄 التنفيذ المتوازي</span>
            </SettingLabel>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={localSettings.parallelExecution}
                onChange={(e) => handleSettingChange('parallelExecution', e.target.checked)}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingRow>

          <SettingRow>
            <SettingLabel>
              <span>📊 عدد العمليات المتزامنة</span>
            </SettingLabel>
            <Select
              value={localSettings.maxConcurrent}
              onChange={(e) => handleSettingChange('maxConcurrent', parseInt(e.target.value))}
            >
              <option value="1">1 عملية</option>
              <option value="2">2 عملية</option>
              <option value="3">3 عمليات</option>
              <option value="5">5 عمليات</option>
              <option value="10">10 عمليات</option>
            </Select>
          </SettingRow>

          <SettingRow>
            <SettingLabel>
              <span>💾 التخزين المؤقت</span>
            </SettingLabel>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={localSettings.cacheEnabled}
                onChange={(e) => handleSettingChange('cacheEnabled', e.target.checked)}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingRow>
        </SettingsSection>

        {/* Security Settings */}
        <SettingsSection>
          <SectionTitle>🛡️ أمان النظام</SectionTitle>
          
          <SettingRow>
            <SettingLabel>
              <span>🔐 تأكيد العمليات الحساسة</span>
            </SettingLabel>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={localSettings.confirmSensitive}
                onChange={(e) => handleSettingChange('confirmSensitive', e.target.checked)}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingRow>

          <SettingRow>
            <SettingLabel>
              <span>📋 تسجيل الأنشطة</span>
            </SettingLabel>
            <ToggleSwitch>
              <ToggleInput
                type="checkbox"
                checked={localSettings.activityLogging}
                onChange={(e) => handleSettingChange('activityLogging', e.target.checked)}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </SettingRow>
        </SettingsSection>

        {/* Display Settings */}
        <SettingsSection>
          <SectionTitle>🖼️ عرض البطاقات</SectionTitle>
          
          <SettingRow>
            <SettingLabel>
              <span>📊 عدد الأعمدة</span>
            </SettingLabel>
            <Select
              value={localSettings.gridColumns}
              onChange={(e) => handleSettingChange('gridColumns', parseInt(e.target.value))}
            >
              <option value="1">عمود واحد</option>
              <option value="2">عمودان</option>
              <option value="3">3 أعمدة</option>
              <option value="4">4 أعمدة</option>
              <option value="5">5 أعمدة</option>
              <option value="6">6 أعمدة</option>
            </Select>
          </SettingRow>

          <SettingRow>
            <SettingLabel>
              <span>🌈 أسلوب البطاقات</span>
            </SettingLabel>
            <Select
              value={localSettings.cardStyle}
              onChange={(e) => handleSettingChange('cardStyle', e.target.value)}
            >
              <option value="cyberpunk">سيبر بانك</option>
              <option value="neon">نيون</option>
              <option value="glass">زجاجي</option>
              <option value="minimal">مختزل</option>
            </Select>
          </SettingRow>

          <SettingRow>
            <SettingLabel>
              <span>🎨 لون التمييز الشخصي</span>
            </SettingLabel>
            <ColorPicker
              type="color"
              value={localSettings.accentColor}
              onChange={(e) => handleSettingChange('accentColor', e.target.value)}
            />
          </SettingRow>
        </SettingsSection>

        <ButtonGroup>
          <ActionButton onClick={onClose}>إلغاء</ActionButton>
          <ActionButton primary onClick={handleSave}>حفظ الإعدادات</ActionButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};