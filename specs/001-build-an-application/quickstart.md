# Quickstart: AI Photo Generation and Album Management

## Manual Testing Scenarios

### 1. Project and Album Organization

**Test: Create Project Structure**
1. Open the application
2. Click "New Project" button
3. Enter project name "Photography Portfolio"
4. Add description "Client work and personal projects"
5. Choose a color (blue)
6. Verify project appears in main view

**Expected**: Project card displayed with name, description, and chosen color

**Test: Create Albums in Project**
1. Click on "Photography Portfolio" project
2. Click "New Album" button
3. Create album "Landscape Photography"
4. Create album "Portrait Sessions"
5. Verify both albums appear in project view

**Expected**: Two album cards visible with names and "0 photos" count

**Test: Drag and Drop Album Reordering**
1. In project view with multiple albums
2. Drag "Portrait Sessions" above "Landscape Photography"
3. Release drag
4. Refresh page to verify persistence

**Expected**: Album order changes and persists after refresh

### 2. Photo Generation Workflow

**Test: Generate Photo with Basic Prompt**
1. Navigate to "Landscape Photography" album
2. Click "Generate Photo" button
3. Select an available AI model
4. Enter prompt: "Stunning mountain landscape at sunset"
5. Click "Generate"
6. Wait for generation to complete

**Expected**: 
- Loading state shows during generation
- Photo appears in album when complete
- Photo metadata shows prompt and model used

**Test: Generate Photo with Template**
1. Go to Templates section
2. Create new template "Nature Photography"
3. Set base prompt: "Beautiful {subject} in {lighting} lighting"
4. Add parameters: subject (text), lighting (select: golden hour, blue hour, dramatic)
5. Save template
6. Use template to generate photo with values: subject="forest", lighting="golden hour"

**Expected**: Template saves successfully and generates photo with filled prompt

**Test: Fal.ai Integration Error Handling**
1. Enter invalid prompt (empty or very long)
2. Try to generate photo
3. Verify error message appears
4. Try again with valid prompt

**Expected**: Clear error messages, ability to retry with corrections

### 3. Photo Management

**Test: Photo Tile View**
1. Generate 5-10 photos in an album
2. View album in tile layout
3. Verify thumbnails load quickly
4. Test different grid sizes (small, medium, large)

**Expected**: Responsive tile grid, smooth scrolling, consistent aspect ratios

**Test: Photo Full View**
1. Click on a photo thumbnail
2. Verify full-size image opens
3. Check metadata display (prompt, model, generation time)
4. Navigate between photos using arrows

**Expected**: High-quality image display, complete metadata, smooth navigation

**Test: Photo Reordering**
1. In album with multiple photos
2. Drag photo from one position to another
3. Verify order changes immediately
4. Refresh to confirm persistence

**Expected**: Smooth drag interaction, immediate visual feedback, persistent order

### 4. Cross-Album Operations

**Test: Move Photos Between Albums**
1. Select multiple photos in source album
2. Use "Move to Album" action
3. Choose destination album
4. Confirm move operation

**Expected**: Photos removed from source, appear in destination, counts updated

**Test: Album Cover Photo**
1. In album with photos
2. Right-click a photo
3. Select "Set as Album Cover"
4. Return to project view
5. Verify album shows cover photo

**Expected**: Selected photo appears as album thumbnail in project view

### 5. Performance and Usability

**Test: Large Album Performance**
1. Generate 50+ photos in single album
2. Test scrolling performance
3. Test search/filter functionality
4. Monitor page responsiveness

**Expected**: Smooth scrolling, responsive interactions, <200ms UI response

**Test: Offline Behavior**
1. Disconnect internet
2. Try to browse existing photos and albums
3. Try to generate new photo
4. Reconnect and verify sync

**Expected**: Local data accessible offline, graceful error for generation, auto-retry on reconnect

**Test: Data Persistence**
1. Create projects, albums, and photos
2. Close browser completely
3. Reopen application
4. Verify all data preserved

**Expected**: Complete data recovery, proper loading states

### 6. Error Scenarios

**Test: Invalid Album Operations**
1. Try to create album without name
2. Try to delete album with photos
3. Try to move album into another album (should be prevented)

**Expected**: Appropriate validation messages, operations prevented when invalid

**Test: Photo Generation Failures**
1. Use overly complex prompt that might fail
2. Generate many photos rapidly (rate limiting)
3. Try generation with network issues

**Expected**: Clear error messages, retry options, graceful degradation

**Test: Database Corruption Recovery**
1. Simulate database corruption (development only)
2. Verify application handles gracefully
3. Test data backup/restore if implemented

**Expected**: Error detection, recovery options, data protection

## Acceptance Criteria Validation

### ✅ Core Functionality
- [ ] AI photo generation works with multiple models
- [ ] Photos save to selected albums
- [ ] Albums organize into projects
- [ ] Drag-and-drop reordering functions
- [ ] Tile interface displays photos clearly

### ✅ User Experience
- [ ] Loading states for operations >200ms
- [ ] Error messages are clear and helpful
- [ ] Keyboard navigation works throughout app
- [ ] Interface is visually consistent
- [ ] Responsive design works on different screens

### ✅ Performance
- [ ] Initial load <2.5s (LCP)
- [ ] UI interactions <200ms
- [ ] Photo generation feedback <5s
- [ ] Smooth 60fps drag operations
- [ ] Bundle size <2MB

### ✅ Data Integrity
- [ ] Album flat structure enforced
- [ ] Photo metadata preserved accurately
- [ ] Database transactions maintain consistency
- [ ] No data loss during operations

## Success Metrics

- **Generation Success Rate**: >95% of photo generations complete successfully
- **UI Responsiveness**: All interactions complete within performance targets
- **Data Reliability**: Zero data loss incidents during testing
- **User Flow Completion**: All primary workflows complete without errors
- **Accessibility Compliance**: Passes WCAG 2.1 AA standards
