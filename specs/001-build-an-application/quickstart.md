# Quickstart Guide: AI Photo Generation & Album Management

## Overview
This quickstart validates the core user stories from the feature specification through executable test scenarios.

## Prerequisites
- Node.js 18+ with pnpm
- All dependencies installed (`pnpm install`)
- Development server running (`pnpm dev`)

## Core User Journey Testing

### Test Scenario 1: Generate First Photo
**Story**: User generates AI photo using model and prompt

**Steps**:
1. Navigate to application home page
2. Click "Generate Photo" button
3. Select AI model: "fal-ai/fast-sdxl"
4. Enter prompt: "A serene mountain lake at sunrise"
5. Click "Generate"
6. Wait for generation completion (expect ~10-30 seconds)

**Expected Results**:
- Loading indicator shows during generation
- Generated photo displays with prompt and model info
- Photo is automatically saved to local SQLite database
- Success notification appears

**Validation**:
```bash
# Check database contains new photo
sqlite3 ./data/photoshop-killer.db "SELECT prompt, model_name, fal_url FROM photos ORDER BY created_at DESC LIMIT 1;"
```

### Test Scenario 2: Create Project and Album Structure
**Story**: User organizes photos into project-based album hierarchy

**Steps**:
1. From home page, click "New Project"
2. Enter project name: "Nature Photography"
3. Save project
4. Within project, click "New Album"
5. Enter album name: "Mountain Landscapes"
6. Save album

**Expected Results**:
- Project appears in main navigation
- Album appears within project section
- Empty album shows placeholder message
- Database tables updated correctly

**Validation**:
```bash
# Verify project and album creation
sqlite3 ./data/photoshop-killer.db "
  SELECT p.name as project, a.name as album, a.display_order 
  FROM projects p 
  LEFT JOIN albums a ON p.id = a.project_id 
  ORDER BY p.created_at DESC, a.display_order;
"
```

### Test Scenario 3: Add Photo to Album
**Story**: User organizes generated photo into specific album

**Steps**:
1. Navigate to generated photo from Scenario 1
2. Click "Add to Album" button
3. Select project: "Nature Photography"
4. Select album: "Mountain Landscapes"
5. Confirm addition

**Expected Results**:
- Photo appears in album tile view
- Album shows photo count (1)
- Photo maintains original metadata

**Validation**:
```bash
# Check photo-album relationship
sqlite3 ./data/photoshop-killer.db "
  SELECT p.prompt, a.name as album, proj.name as project 
  FROM photos p 
  JOIN albums a ON p.album_id = a.id 
  JOIN projects proj ON a.project_id = proj.id;
"
```

### Test Scenario 4: Drag-and-Drop Album Reordering
**Story**: User reorganizes albums via drag-and-drop

**Prerequisite**: Create second album "Desert Scenes" in same project

**Steps**:
1. Navigate to project "Nature Photography"
2. Observe current album order
3. Drag "Desert Scenes" album above "Mountain Landscapes"
4. Drop in new position
5. Refresh page to verify persistence

**Expected Results**:
- Albums visually reorder during drag
- New order persists after page refresh
- Display order values updated in database

**Validation**:
```bash
# Check album display order
sqlite3 ./data/photoshop-killer.db "
  SELECT name, display_order 
  FROM albums 
  WHERE project_id = (SELECT id FROM projects WHERE name = 'Nature Photography')
  ORDER BY display_order;
"
```

### Test Scenario 5: Tile-Based Photo Viewing
**Story**: User views photos in tile interface within album

**Prerequisite**: Add 3-5 photos to "Mountain Landscapes" album

**Steps**:
1. Navigate to album "Mountain Landscapes"
2. Observe tile layout presentation
3. Test responsive behavior by resizing window
4. Click on individual photo tile
5. Verify photo detail view opens

**Expected Results**:
- Photos display in masonry-style grid
- Tiles show photo preview and prompt text
- Layout adapts to different screen sizes
- Click interaction opens detailed view

### Test Scenario 6: Error Handling and Recovery
**Story**: System gracefully handles generation failures

**Steps**:
1. Attempt photo generation with invalid prompt (empty string)
2. Attempt generation while offline/API unavailable
3. Try creating project with duplicate name
4. Test database connection failure simulation

**Expected Results**:
- User-friendly error messages appear
- Application remains stable and usable
- Partial data is handled gracefully
- Recovery instructions provided where applicable

## Performance Validation

### Response Time Targets
- UI interactions: < 100ms response
- Photo generation: < 30s total time
- Album loading: < 500ms for 50 photos
- Drag-drop operations: < 50ms visual feedback

### Memory Usage
- Initial app load: < 50MB RAM
- Per photo cached: < 2MB RAM
- Large album (100 photos): < 200MB total

## Automated Test Commands

```bash
# Run integration tests covering these scenarios
pnpm test:integration

# Run E2E tests with Playwright
pnpm test:e2e

# Performance testing
pnpm test:perf

# Database validation
pnpm test:database

# Full quickstart validation
pnpm quickstart:validate
```

## Success Criteria

✅ All 6 test scenarios complete without errors  
✅ Database integrity maintained throughout  
✅ UI remains responsive during operations  
✅ Error conditions handled gracefully  
✅ Performance targets met  
✅ Data persists across browser sessions  

## Troubleshooting

### Common Issues
1. **Generation timeout**: Check fal.ai API status, increase timeout limit
2. **Database locked**: Ensure proper transaction handling, check WAL mode
3. **Layout issues**: Verify CSS columns support, check responsive breakpoints
4. **Drag-drop not working**: Check dnd-kit version, verify touch support

### Debugging Commands
```bash
# Check database schema
sqlite3 ./data/photoshop-killer.db ".schema"

# View recent logs
tail -f ./logs/application.log

# Test API connectivity
curl -X POST https://fal.run/fal-ai/fast-sdxl/v1/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "test connection"}'
```

This quickstart guide validates all functional requirements and provides a foundation for automated testing and continuous validation of the application's core features.